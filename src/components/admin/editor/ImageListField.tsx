'use client';

import { useId, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ImagePlus, Trash2 } from 'lucide-react';
import type { CaptionedImage } from '@/lib/news/types';
import { newId } from '@/lib/news/sections';
import { Button, IconButton, Input, Muted, Row } from '../ui';
import { ACCEPT_ATTR, imagesFromClipboard, uploadImage } from './upload';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ItemCard = styled.div<{ $dragging: boolean }>`
  border: 1px solid ${({ theme, $dragging }) => ($dragging ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  box-shadow: ${({ $dragging, theme }) => ($dragging ? theme.shadows.glow : 'none')};
  position: relative;
  z-index: ${({ $dragging }) => ($dragging ? 5 : 'auto')};

  .img {
    position: relative;
    aspect-ratio: 16 / 10;
    background: ${({ theme }) => theme.colors.navy};

    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .tools {
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    display: flex;
    justify-content: space-between;

    button { background: rgba(10, 10, 12, 0.85); }
    .handle { cursor: grab; touch-action: none; }
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 6px;

    input { padding: 0.35rem 0.5rem; font-size: 0.8125rem; }
  }
`;

const ErrorText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.error};
`;

function SortableItem({ item, onChange, onRemove }: { item: CaptionedImage; onChange: (i: CaptionedImage) => void; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const thumb = item.image.variants?.find((v) => v.width >= 480)?.url ?? item.image.url;
  return (
    <ItemCard ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} $dragging={isDragging}>
      <div className='img'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt={item.image.alt}/>
        <div className='tools'>
          <IconButton type='button' className='handle' aria-label='Перетащить' {...attributes} {...listeners}><GripVertical size={15}/></IconButton>
          <IconButton type='button' aria-label='Удалить фото' onClick={onRemove}><Trash2 size={15}/></IconButton>
        </div>
      </div>
      <div className='fields'>
        <Input placeholder='Подпись' value={item.caption ?? ''} onChange={(e) => onChange({ ...item, caption: e.target.value })}/>
        <Input
          placeholder='Alt (обязательно)'
          value={item.image.alt}
          aria-invalid={!item.image.alt.trim()}
          onChange={(e) => onChange({ ...item, image: { ...item.image, alt: e.target.value } })}
        />
      </div>
    </ItemCard>
  );
}

interface Props {
  items: CaptionedImage[];
  onChange: (items: CaptionedImage[]) => void;
  max?: number;
}

export default function ImageListField({ items, onChange, max = 40 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Стабильный id — иначе dnd-kit генерирует разные aria-describedby на сервере и клиенте
  const dndId = useId();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const addFiles = async (files: File[]) => {
    const room = max - items.length;
    if (room <= 0 || !files.length) return;
    setBusy(true);
    setError(null);
    const added: CaptionedImage[] = [];
    for (const file of files.slice(0, room)) {
      try {
        added.push({ id: newId(), image: await uploadImage(file), caption: '' });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Ошибка загрузки');
      }
    }
    onChange([...items, ...added]);
    setBusy(false);
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const from = items.findIndex((i) => i.id === active.id);
    const to = items.findIndex((i) => i.id === over.id);
    onChange(arrayMove(items, from, to));
  };

  return (
    <div onPaste={(e) => addFiles(imagesFromClipboard(e))}>
      <DndContext id={dndId} sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
          <Grid>
            {items.map((item, index) => (
              <SortableItem
                key={item.id}
                item={item}
                onChange={(next) => onChange(items.map((i, k) => (k === index ? next : i)))}
                onRemove={() => onChange(items.filter((_, k) => k !== index))}
              />
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
      <input
        ref={inputRef}
        type='file'
        accept={ACCEPT_ATTR}
        multiple
        hidden
        onChange={(e) => { addFiles(Array.from(e.target.files ?? [])); e.target.value = ''; }}
      />
      <Row style={{ marginTop: '0.5rem' }} $wrap>
        <Button type='button' $size='sm' onClick={() => inputRef.current?.click()} disabled={busy || items.length >= max}>
          <ImagePlus size={14}/> {busy ? 'Загружаем…' : 'Добавить фото'}
        </Button>
        <Muted>{items.length} / {max} · можно выбрать несколько или вставить из буфера; порядок — перетаскиванием</Muted>
      </Row>
      {error && <ErrorText role='alert'>{error}</ErrorText>}
    </div>
  );
}
