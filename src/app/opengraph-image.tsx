import { renderOgImage, OG_SIZE } from '@/lib/og';

export const alt = 'НПП «Биохиммаш» — дезинсекция, дератизация, дезинфекция для организаций';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOgImage({
    kicker: 'Пест-контроль для бизнеса',
    title: 'Дезинсекция, дератизация и дезинфекция для организаций',
    subtitle: 'Договор, акты и документы для проверок. Работаем с 2002 года.',
  });
}
