'use client';

import { useRef, useState, type DragEvent } from 'react';
import styled, { css } from 'styled-components';
import { ImagePlus, Images, RefreshCw, Trash2, X } from 'lucide-react';
import type { MediaRef } from '@/lib/news/types';
import { Button, Field, IconButton, Input, Muted, Row } from '../ui';
import { ACCEPT_ATTR, fetchLibrary, imagesFromClipboard, uploadImage } from './upload';

const Drop = styled.div<{ $active: boolean; $compact?: boolean }>`
  position: relative;
  display: grid;
  place-items: center;
  min-height: ${({ $compact }) => ($compact ? '96px' : '150px')};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  font-size: 0.8125rem;
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  outline: none;

  &:hover, &:focus-visible { border-color: ${({ theme }) => theme.colors.primary}; color: ${({ theme }) => theme.colors.text}; }

  ${({ $active, theme }) => $active && css`
    border-color: ${theme.colors.primary};
    background: rgba(217, 177, 95, 0.06);
  `}

  svg { color: ${({ theme }) => theme.colors.primary}; margin: 0 auto 0.4rem; }
`;

const Preview = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};

  img { width: 100%; max-height: 260px; object-fit: contain; display: block; }

  .tools {
    position: absolute;
    top: 6px;
    right: 6px;
    display: flex;
    gap: 4px;

    button { background: rgba(10, 10, 12, 0.85); }
  }
`;

const Library = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
    gap: 6px;
    max-height: 260px;
    overflow: auto;
    margin-top: 0.5rem;
  }

  button.item {
    aspect-ratio: 4 / 3;
    border-radius: 3px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0;
    background: none;

    img { width: 100%; height: 100%; object-fit: cover; }
    &:hover, &:focus-visible { border-color: ${({ theme }) => theme.colors.primary}; outline: none; }
  }
`;

const ErrorText = styled.p`
  margin-top: 0.4rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.error};
`;

const thumbOf = (m: MediaRef) => m.variants?.find((v) => v.width >= 480)?.url ?? m.url;

interface ImageFieldProps {
  value: MediaRef | null | undefined;
  onChange: (value: MediaRef | null) => void;
  label?: string;
  compact?: boolean;
  // Если alt редактируется снаружи (галерея) — здесь поле не показываем
  hideAlt?: boolean;
  altError?: string;
}

export default function ImageField({ value, onChange, label, compact, hideAlt, altError }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [library, setLibrary] = useState<MediaRef[] | null>(null);

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      onChange(await uploadImage(file, value?.alt ?? ''));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки');
    } finally {
      setBusy(false);
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    upload(e.dataTransfer.files[0]);
  };

  const openLibrary = async () => {
    if (library) { setLibrary(null); return; }
    try {
      setLibrary(await fetchLibrary());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка');
    }
  };

  const picker = (
    <input ref={inputRef} type='file' accept={ACCEPT_ATTR} hidden onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ''; }}/>
  );

  const body = value ? (
    <>
      <Preview>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumbOf(value)} alt={value.alt}/>
        <div className='tools'>
          <IconButton type='button' title='Заменить' aria-label='Заменить изображение' onClick={() => inputRef.current?.click()} disabled={busy}><RefreshCw size={15}/></IconButton>
          <IconButton type='button' title='Убрать' aria-label='Убрать изображение' onClick={() => onChange(null)}><Trash2 size={15}/></IconButton>
        </div>
      </Preview>
      {!hideAlt && (
        <div style={{ marginTop: '0.5rem' }}>
          <Field label='Alt — описание для поисковиков и незрячих' error={altError ?? (!value.alt.trim() ? 'Alt обязателен' : undefined)}>
            <Input value={value.alt} onChange={(e) => onChange({ ...value, alt: e.target.value })} aria-invalid={!value.alt.trim()} placeholder='Что изображено на фото'/>
          </Field>
        </div>
      )}
    </>
  ) : (
    <Drop
      role='button'
      tabIndex={0}
      $active={drag}
      $compact={compact}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      onPaste={(e) => upload(imagesFromClipboard(e)[0])}
      aria-label='Загрузить изображение'
    >
      <div>
        <ImagePlus size={22}/>
        {busy ? 'Загружаем и оптимизируем…' : <>Перетащите фото, вставьте из буфера (Ctrl+V)<br/>или нажмите, чтобы выбрать</>}
        <div><Muted>JPG, PNG, WebP до 12 МБ</Muted></div>
      </div>
    </Drop>
  );

  return (
    <div>
      {label && <div style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>{label}</div>}
      {picker}
      {body}
      <Row style={{ marginTop: '0.4rem' }}>
        <Button type='button' $variant='subtle' $size='sm' onClick={openLibrary}>
          {library ? <X size={14}/> : <Images size={14}/>} {library ? 'Закрыть библиотеку' : 'Из библиотеки'}
        </Button>
      </Row>
      {library && (
        <Library>
          <Muted>Выберите загруженное ранее изображение</Muted>
          <div className='grid'>
            {library.map((m) => (
              <button key={m.id ?? m.url} type='button' className='item' onClick={() => { onChange({ ...m, alt: m.alt || value?.alt || '' }); setLibrary(null); }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumbOf(m)} alt={m.alt}/>
              </button>
            ))}
          </div>
        </Library>
      )}
      {error && <ErrorText role='alert'>{error}</ErrorText>}
    </div>
  );
}
