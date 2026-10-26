'use client';

import { useId, useState } from 'react';
import styled from 'styled-components';
import {
  DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDown, ChevronUp, Copy, GripVertical, Plus, Settings2, Trash2, X } from 'lucide-react';
import type { Section, SectionType } from '@/lib/news/types';
import { cloneSection, createSection, sectionLabel } from '@/lib/news/sections';
import { Badge, Button, IconButton, Muted, Row } from '../ui';
import { SectionFields, SettingsForm, sectionSummary } from './SectionForms';
import Palette from './Palette';

const Card = styled.div<{ $dragging: boolean; $error: boolean }>`
  position: relative;
  border: 1px solid ${({ theme, $dragging, $error }) => ($error ? theme.colors.error : $dragging ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.navy};
  box-shadow: ${({ $dragging, theme }) => ($dragging ? theme.shadows.glow : 'none')};
  z-index: ${({ $dragging }) => ($dragging ? 10 : 'auto')};
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.7rem;

  .handle { cursor: grab; touch-action: none; }
  .meta {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    cursor: pointer;
    background: none;
    text-align: left;
    color: inherit;
    padding: 0.2rem 0;

    span.summary { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  }
`;

const Body = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  .settings {
    padding-top: ${({ theme }) => theme.spacing.md};
    border-top: 1px dashed ${({ theme }) => theme.colors.border};
  }
`;

const Inserter = styled.div`
  display: flex;
  justify-content: center;
  margin: 2px 0;
  opacity: 0.35;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover, &:focus-within { opacity: 1; }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

interface CardProps {
  section: Section;
  index: number;
  total: number;
  open: boolean;
  hasError: boolean;
  onToggle: () => void;
  onChange: (s: Section) => void;
  onMove: (dir: -1 | 1) => void;
  onDuplicate: () => void;
  onRemove: () => void;
}

function SortableSection({ section, index, total, open, hasError, onToggle, onChange, onMove, onDuplicate, onRemove }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });
  const [confirm, setConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <Card ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} $dragging={isDragging} $error={hasError} data-section-id={section.id}>
      <Head>
        <IconButton type='button' className='handle' aria-label='Перетащить секцию' {...attributes} {...listeners}><GripVertical size={16}/></IconButton>
        <button type='button' className='meta' onClick={onToggle} aria-expanded={open}>
          <Badge>{String(index + 1).padStart(2, '0')} · {sectionLabel(section.type)}</Badge>
          <Muted className='summary'>{sectionSummary(section)}</Muted>
        </button>
        {confirm ? (
          <Row>
            <Muted>Удалить?</Muted>
            <Button type='button' $variant='danger' $size='sm' onClick={onRemove}>Да</Button>
            <Button type='button' $size='sm' onClick={() => setConfirm(false)}>Нет</Button>
          </Row>
        ) : (
          <Row $gap='2px'>
            <IconButton type='button' aria-label='Выше' title='Выше' disabled={index === 0} onClick={() => onMove(-1)}><ChevronUp size={16}/></IconButton>
            <IconButton type='button' aria-label='Ниже' title='Ниже' disabled={index === total - 1} onClick={() => onMove(1)}><ChevronDown size={16}/></IconButton>
            <IconButton type='button' aria-label='Дублировать' title='Дублировать' onClick={onDuplicate}><Copy size={15}/></IconButton>
            <IconButton type='button' aria-label='Удалить' title='Удалить' onClick={() => setConfirm(true)}><Trash2 size={15}/></IconButton>
          </Row>
        )}
      </Head>
      {open && (
        <Body>
          <SectionFields section={section} onChange={onChange}/>
          <div className='settings'>
            <Button type='button' $variant='subtle' $size='sm' onClick={() => setShowSettings((v) => !v)}>
              <Settings2 size={14}/> Оформление секции {showSettings ? '▴' : '▾'}
            </Button>
            {showSettings && (
              <div style={{ marginTop: '0.75rem' }}>
                <SettingsForm value={section.settings} onChange={(settings) => onChange({ ...section, settings })}/>
              </div>
            )}
          </div>
        </Body>
      )}
    </Card>
  );
}

interface Props {
  sections: Section[];
  onChange: (sections: Section[]) => void;
  errorIndexes: Set<number>;
}

export default function SectionList({ sections, onChange, errorIndexes }: Props) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(sections.slice(0, 2).map((s) => s.id)));
  // Где открыта палитра: индекс вставки (или null)
  const [paletteAt, setPaletteAt] = useState<number | null>(null);
  // Стабильный id — иначе dnd-kit генерирует разные aria-describedby на сервере и клиенте
  const dndId = useId();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const insert = (type: SectionType, at: number) => {
    const section = createSection(type);
    const next = [...sections];
    next.splice(at, 0, section);
    onChange(next);
    setOpenIds((prev) => new Set(prev).add(section.id));
    setPaletteAt(null);
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    onChange(arrayMove(sections, sections.findIndex((s) => s.id === active.id), sections.findIndex((s) => s.id === over.id)));
  };

  const toggle = (id: string) => setOpenIds((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });

  const inserter = (at: number) => (
    paletteAt === at ? (
      <div style={{ margin: '0.5rem 0' }}>
        <Row $justify='space-between' style={{ marginBottom: '0.4rem' }}>
          <Muted>Выберите тип секции</Muted>
          <IconButton type='button' aria-label='Закрыть палитру' onClick={() => setPaletteAt(null)}><X size={16}/></IconButton>
        </Row>
        <Palette onPick={(type) => insert(type, at)}/>
      </div>
    ) : (
      <Inserter>
        <Button type='button' $variant='subtle' $size='sm' onClick={() => setPaletteAt(at)} aria-label='Вставить секцию здесь'><Plus size={14}/></Button>
      </Inserter>
    )
  );

  return (
    <div>
      <DndContext id={dndId} sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <List>
            {inserter(0)}
            {sections.map((section, index) => (
              <div key={section.id}>
                <SortableSection
                  section={section}
                  index={index}
                  total={sections.length}
                  open={openIds.has(section.id)}
                  hasError={errorIndexes.has(index)}
                  onToggle={() => toggle(section.id)}
                  onChange={(s) => onChange(sections.map((x, k) => (k === index ? s : x)))}
                  onMove={(dir) => onChange(arrayMove(sections, index, index + dir))}
                  onDuplicate={() => {
                    const copy = cloneSection(section);
                    const next = [...sections];
                    next.splice(index + 1, 0, copy);
                    onChange(next);
                  }}
                  onRemove={() => onChange(sections.filter((_, k) => k !== index))}
                />
                {index < sections.length - 1 && inserter(index + 1)}
              </div>
            ))}
          </List>
        </SortableContext>
      </DndContext>
      <div style={{ marginTop: '0.75rem' }}>
        {paletteAt === sections.length && sections.length > 0 ? inserter(sections.length) : (
          <Button type='button' onClick={() => setPaletteAt(sections.length)} style={{ width: '100%', padding: '0.9rem' }}>
            <Plus size={16}/> Добавить секцию
          </Button>
        )}
      </div>
    </div>
  );
}
