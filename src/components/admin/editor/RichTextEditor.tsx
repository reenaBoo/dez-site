'use client';

import { useState } from 'react';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styled from 'styled-components';
import { Bold, Heading2, Heading3, Italic, Link2, List, ListOrdered, Quote, Unlink } from 'lucide-react';
import type { RichDoc } from '@/lib/news/types';
import { Prose } from '@/components/news/RichText';
import { Button, Input, Select } from '../ui';

// Внутренние страницы для быстрой перелинковки
export const INTERNAL_PAGES = [
  { href: '/services', label: 'Услуги' },
  { href: '/prices', label: 'Цены' },
  { href: '/industries', label: 'Отрасли' },
  { href: '/contacts', label: 'Контакты' },
  { href: '/about', label: 'О компании' },
  { href: '/news', label: 'Новости' },
  { href: '/', label: 'Главная' },
];

const Wrap = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};

  &:focus-within { border-color: ${({ theme }) => theme.colors.primary}; }
`;

const Toolbar = styled.div`
  position: sticky;
  top: 56px;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.navy};
  border-radius: ${({ theme }) => theme.borderRadius.md} ${({ theme }) => theme.borderRadius.md} 0 0;

  button.tool {
    display: grid;
    place-items: center;
    width: 32px;
    height: 30px;
    border-radius: 3px;
    background: transparent;
    color: ${({ theme }) => theme.colors.textLight};

    &:hover { color: ${({ theme }) => theme.colors.heading}; background: ${({ theme }) => theme.colors.navyLight}; }
    &[aria-pressed='true'] { color: ${({ theme }) => theme.colors.primary}; background: rgba(217, 177, 95, 0.12); }
    &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.primaryLight}; }
  }

  .sep { width: 1px; height: 20px; background: ${({ theme }) => theme.colors.border}; margin: 0 4px; }
`;

const LinkBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 6px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.navy};

  input { flex: 1; min-width: 180px; padding: 0.4rem 0.6rem; }
  select { width: auto; padding: 0.4rem 2rem 0.4rem 0.6rem; }
`;

const Area = styled(Prose)`
  font-size: 1rem;

  .ProseMirror {
    min-height: 140px;
    padding: 0.9rem 1rem;
    outline: none;

    > * + * { margin-top: 0.9em; }
    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
      color: ${({ theme }) => theme.colors.textLight};
    }
  }
`;

interface Props {
  value: RichDoc;
  onChange: (doc: RichDoc) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Начните писать…' }: Props) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [href, setHref] = useState('');

  const editor = useEditor({
    // Только то, что поддерживает санитайзер и рендер на сайте
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        strike: false,
        underline: false,
        horizontalRule: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https', HTMLAttributes: { rel: null, target: null } },
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: { attributes: { 'data-placeholder': placeholder } },
    onUpdate: ({ editor: ed }) => onChange(ed.getJSON() as RichDoc),
  });

  const state = useEditorState({
    editor,
    selector: ({ editor: ed }) => ({
      bold: ed?.isActive('bold') ?? false,
      italic: ed?.isActive('italic') ?? false,
      h2: ed?.isActive('heading', { level: 2 }) ?? false,
      h3: ed?.isActive('heading', { level: 3 }) ?? false,
      bullet: ed?.isActive('bulletList') ?? false,
      ordered: ed?.isActive('orderedList') ?? false,
      quote: ed?.isActive('blockquote') ?? false,
      link: ed?.isActive('link') ?? false,
    }),
  });

  if (!editor || !state) return <Wrap><Area as='div'><div className='ProseMirror'/></Area></Wrap>;

  const chain = () => editor.chain().focus();

  const openLink = () => {
    setHref((editor.getAttributes('link').href as string | undefined) ?? '');
    setLinkOpen(true);
  };

  const applyLink = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) chain().extendMarkRange('link').unsetLink().run();
    else chain().extendMarkRange('link').setLink({ href: trimmed }).run();
    setLinkOpen(false);
  };

  const tool = (label: string, active: boolean, onClick: () => void, icon: React.ReactNode) => (
    <button type='button' className='tool' title={label} aria-label={label} aria-pressed={active} onMouseDown={(e) => e.preventDefault()} onClick={onClick}>
      {icon}
    </button>
  );

  return (
    <Wrap>
      <Toolbar>
        {tool('Жирный (Ctrl+B)', state.bold, () => chain().toggleBold().run(), <Bold size={16}/>)}
        {tool('Курсив (Ctrl+I)', state.italic, () => chain().toggleItalic().run(), <Italic size={16}/>)}
        <span className='sep'/>
        {tool('Заголовок H2', state.h2, () => chain().toggleHeading({ level: 2 }).run(), <Heading2 size={16}/>)}
        {tool('Подзаголовок H3', state.h3, () => chain().toggleHeading({ level: 3 }).run(), <Heading3 size={16}/>)}
        <span className='sep'/>
        {tool('Маркированный список', state.bullet, () => chain().toggleBulletList().run(), <List size={16}/>)}
        {tool('Нумерованный список', state.ordered, () => chain().toggleOrderedList().run(), <ListOrdered size={16}/>)}
        {tool('Цитата', state.quote, () => chain().toggleBlockquote().run(), <Quote size={16}/>)}
        <span className='sep'/>
        {tool('Ссылка', state.link, openLink, <Link2 size={16}/>)}
        {state.link && tool('Убрать ссылку', false, () => chain().extendMarkRange('link').unsetLink().run(), <Unlink size={16}/>)}
      </Toolbar>
      {linkOpen && (
        <LinkBar>
          <Select aria-label='Страница сайта' value='' onChange={(e) => e.target.value && applyLink(e.target.value)}>
            <option value=''>Страница сайта…</option>
            {INTERNAL_PAGES.map((p) => <option key={p.href} value={p.href}>{p.label}</option>)}
          </Select>
          <Input
            autoFocus
            placeholder='https://… или /services'
            value={href}
            onChange={(e) => setHref(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); applyLink(href); }
              if (e.key === 'Escape') setLinkOpen(false);
            }}
          />
          <Button type='button' $size='sm' $variant='primary' onClick={() => applyLink(href)}>Применить</Button>
          <Button type='button' $size='sm' onClick={() => setLinkOpen(false)}>Отмена</Button>
        </LinkBar>
      )}
      <Area>
        <EditorContent editor={editor}/>
      </Area>
    </Wrap>
  );
}
