import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { count } from 'drizzle-orm';
import type { Db } from './index';
import { articles, media } from './schema';
import { renderCover, type CoverMotif } from './seed-covers';
import { processImage } from '@/lib/media/storage';
import { computeReadingTime, docFromParagraphs } from '@/lib/news/content';
import { createSection } from '@/lib/news/sections';
import type {
  CtaSection, FactSection, FaqSection, GallerySection, HeroSection, ImageGridSection, ImageSection, MediaRef,
  QuoteSection, Section, SectionSettings, TextImageSection, TextSection, VideoSection, DividerSection,
} from '@/lib/news/types';
import type { NewArticleRow } from './schema';

// Демо-контент: 4 подробные статьи, собранные по-разному (с FAQ, CTA и внутренними ссылками),
// и несколько коротких — чтобы сетка /news и пагинация выглядели как на живом сайте.

type Overrides<T> = Partial<Omit<T, 'type' | 'id' | 'settings'>> & { settings?: Partial<SectionSettings> };

function section<T extends Section>(type: T['type'], overrides: Overrides<T> = {}): T {
  const base = createSection(type) as T;
  return { ...base, ...overrides, settings: { ...base.settings, ...overrides.settings } } as T;
}

const link = (text: string, href: string) => ({ type: 'text', text, marks: [{ type: 'link' as const, attrs: { href } }] });
const bold = (text: string) => ({ type: 'text', text, marks: [{ type: 'bold' as const }] });
const plain = (text: string) => ({ type: 'text', text });
const p = (...content: ReturnType<typeof plain>[]) => ({ type: 'paragraph', content });

function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(10, 0, 0, 0);
  return d;
}

async function seedImage(db: Db, key: string, source: { motif: CoverMotif; glowX?: number; glowY?: number; tilt?: number } | { file: string }, alt: string): Promise<MediaRef> {
  const buffer = 'file' in source
    ? await readFile(join(process.cwd(), 'public/images', source.file))
    : await renderCover(source);
  const processed = await processImage(buffer, `seed-${key}`);
  const [row] = await db.insert(media).values({ ...processed, alt }).returning();
  return { id: row.id, url: row.url, width: row.width, height: row.height, alt, variants: row.variants };
}

export async function seedIfEmpty(db: Db): Promise<boolean> {
  const [{ total }] = await db.select({ total: count() }).from(articles);
  if (total > 0) return false;

  const img = {
    restaurant: await seedImage(db, 'restaurant', { motif: 'centipede', glowX: 0.68, glowY: 0.42, tilt: -8 }, 'Пест-контроль на кухне ресторана'),
    bedbug: await seedImage(db, 'bedbug', { motif: 'bug', glowX: 0.62, glowY: 0.45, tilt: 18 }, 'Постельный клоп крупным планом'),
    warehouse: await seedImage(db, 'warehouse', { motif: 'grid', glowX: 0.62, glowY: 0.5 }, 'Схема контрольных точек на складе'),
    mosquito: await seedImage(db, 'mosquito', { motif: 'mosquito', glowX: 0.58, glowY: 0.44, tilt: -6 }, 'Комар — переносчик инфекций'),
    radar: await seedImage(db, 'radar', { motif: 'radar', glowX: 0.4, glowY: 0.55 }, 'Мониторинг вредителей на объекте'),
    bugAlt: await seedImage(db, 'bug-alt', { motif: 'bug', glowX: 0.35, glowY: 0.5, tilt: -30 }, 'Таракан на тёмном фоне'),
    centipedeAlt: await seedImage(db, 'centipede-alt', { motif: 'centipede', glowX: 0.3, glowY: 0.6, tilt: 14 }, 'Многоножка в подвальном помещении'),
    team: await seedImage(db, 'team', { file: 'about-photo.jpg' }, 'Специалисты НПП «Биохиммаш» на объекте'),
  };

  const faqRestaurant = section<FaqSection>('faq', {
    title: 'Частые вопросы о пест-контроле в общепите',
    items: [
      { id: 'f1', question: 'Как часто ресторану нужна дезинсекция и дератизация?', answer: 'Профилактические мероприятия проводятся регулярно по программе пест-контроля, а при обнаружении вредителей — внепланово. Периодичность зависит от площади, типа кухни и истории объекта; мы закладываем её в договор после осмотра.' },
      { id: 'f2', question: 'Какие документы попросит инспектор?', answer: 'Договор со специализированной организацией, программу пест-контроля, акты выполненных работ, журнал учёта мероприятий и схему размещения контрольных устройств. Все эти документы мы готовим и передаём в рамках обслуживания.' },
      { id: 'f3', question: 'Нужно ли закрывать ресторан на время обработки?', answer: 'Чаще всего нет. Мы работаем в нерабочие часы, используем средства, разрешённые для пищевых объектов, и подбираем методы так, чтобы кухня могла открыться по расписанию.' },
      { id: 'f4', question: 'Сколько стоит обслуживание?', answer: 'Пест-контроль для ресторанов и пищевых производств — от 8 000 ₽ в месяц. Точная стоимость зависит от площади и режима работы и рассчитывается после осмотра.' },
    ],
  });

  const ctaDefault = section<CtaSection>('cta', {});

  const restaurant: Section[] = [
    section<HeroSection>('hero', { variant: 'fullscreen', image: img.restaurant, subtitle: 'Пошаговый чек-лист: какие документы, журналы и контрольные устройства проверяет инспектор и как подготовиться заранее.' }),
    section<TextSection>('text', {
      doc: {
        type: 'doc',
        content: [
          p(plain('Плановая или внеплановая проверка Роспотребнадзора почти всегда включает вопрос о защите от вредителей. Инспектора интересует не только отсутствие тараканов на кухне, но и то, '), bold('как организован контроль'), plain(': есть ли договор, программа, журналы и следы реальной работы.')),
          { type: 'heading', attrs: { level: 2 }, content: [plain('Что проверяют в первую очередь')] },
          {
            type: 'bulletList',
            content: [
              'Договор со специализированной организацией на дезинсекцию и дератизацию',
              'Программу пест-контроля с периодичностью работ',
              'Акты выполненных работ и журнал учёта мероприятий',
              'Схему размещения ловушек и приманочных станций',
              'Состояние помещений: щели, вентиляция, хранение отходов',
            ].map((text) => ({ type: 'listItem', content: [p(plain(text))] })),
          },
          p(plain('Если хотя бы одного пункта нет, это повод для предписания даже при чистой кухне. Поэтому документы важнее разовых «обработок перед проверкой».')),
        ],
      },
    }),
    section<FactSection>('fact', { value: 5, decimals: 0, suffix: ' документов', label: 'обычно запрашивает инспектор по разделу «пест-контроль» — все их мы готовим в рамках договора', settings: { background: 'alt' } }),
    section<TextImageSection>('textImage', {
      image: img.radar,
      imageSide: 'right',
      sticky: true,
      doc: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [plain('Мониторинг вместо «обработки по звонку»')] },
          p(plain('Современный пест-контроль строится на мониторинге. На объекте размещаются контрольные устройства, специалист регулярно их проверяет и фиксирует результаты в журнале. Так проблема замечается до того, как её увидят гости или инспектор.')),
          { type: 'heading', attrs: { level: 3 }, content: [plain('Что входит в обслуживание')] },
          p(plain('Разработка программы, монтаж ловушек, профилактические и истребительные мероприятия, отчётность. Подробнее — на странице '), link('услуг', '/services'), plain(' и в разделе '), link('цены', '/prices'), plain('.')),
          p(plain('Для ресторанов важно, чтобы работы не мешали кухне: выбираем время и средства, разрешённые для пищевых объектов.')),
        ],
      },
    }),
    section<QuoteSection>('quote', { text: 'Лучшая подготовка к проверке — когда к ней не нужно готовиться: документы в порядке, а журнал заполнен с прошлого визита.', author: 'Инженер по пест-контролю НПП «Биохиммаш»' }),
    faqRestaurant,
    ctaDefault,
  ];

  const bedbug: Section[] = [
    section<HeroSection>('hero', { variant: 'split', image: img.bedbug, subtitle: 'Клопы в гостинице — риск для репутации и отзывов. Рассказываем, по каким признакам их заметить на раннем этапе.' }),
    section<TextSection>('text', {
      width: 'wide',
      doc: docFromParagraphs(
        'Постельные клопы не связаны с уровнем чистоты: их привозят гости в багаже. Поэтому даже в отеле с безупречной уборкой важно, чтобы персонал знал ранние признаки и сразу сообщал о них.',
        { h2: 'Пять признаков, которые должна знать горничная' },
        { list: ['Тёмные точки на швах матраса и по краю простыни', 'Мелкие пятна крови на постельном белье', 'Сброшенные хитиновые шкурки в складках и за изголовьем', 'Сладковатый запах в номере', 'Жалобы гостей на укусы, расположенные «дорожкой»'] },
        { h2: 'Где искать в первую очередь' },
        'Клопы прячутся рядом с местом отдыха человека: в швах матраса, каркасе кровати, за изголовьем, плинтусами и розетками. Осмотр стоит включить в регламент уборки при смене гостя.',
      ),
    }),
    section<ImageGridSection>('imageGrid', {
      layout: 'feature-left',
      items: [
        { id: 'g1', image: img.bedbug, caption: 'Взрослая особь — 4–7 мм' },
        { id: 'g2', image: img.radar, caption: 'Контрольный осмотр номера' },
        { id: 'g3', image: img.team, caption: 'Обработка номерного фонда' },
      ],
    }),
    section<QuoteSection>('quote', { text: 'Клоп может несколько месяцев обходиться без пищи, поэтому «пустой» номер не значит чистый — нужен осмотр и обработка по регламенту.', settings: { background: 'gold' } }),
    section<TextSection>('text', {
      doc: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [plain('Что делать, если признаки нашли')] },
          p(plain('Номер выводят из продажи, соседние номера осматривают, а обработку проводит специализированная организация. Мы работаем по '), link('отраслевым регламентам', '/industries'), plain(' и выдаём документы для собственника и проверяющих.')),
        ],
      },
    }),
    section<FaqSection>('faq', {
      items: [
        { id: 'b1', question: 'Можно ли обработать только один номер?', answer: 'Обработка одного номера возможна, но обязательно осматриваются соседние помещения — клопы перемещаются по коммуникациям.' },
        { id: 'b2', question: 'Сколько номер будет недоступен?', answer: 'Обычно номер возвращается в продажу после проветривания и контрольного осмотра. Срок зависит от выбранного метода и указывается в акте.' },
        { id: 'b3', question: 'Есть ли гарантия?', answer: 'Да, на работы предоставляется гарантия; при необходимости проводится повторная обработка.' },
      ],
    }),
    section<CtaSection>('cta', { title: 'Нашли признаки клопов?', text: 'Специалист приедет в день обращения, осмотрит номерной фонд и предложит план обработки без закрытия отеля.', buttonLabel: 'Связаться с нами', buttonHref: '/contacts' }),
  ];

  const warehouse: Section[] = [
    section<HeroSection>('hero', { variant: 'title-image', image: img.warehouse, subtitle: 'Склад — идеальное место для грызунов: много укрытий, корма и тишины. Объясняем, почему защита должна быть системной.' }),
    section<TextSection>('text', {
      width: 'wide',
      doc: docFromParagraphs(
        'Разовая дератизация снимает остроту проблемы, но не меняет условий, из-за которых грызуны пришли. Через несколько недель популяция восстанавливается — особенно если рядом есть другие склады или открытые контейнерные площадки.',
        { h2: 'Как выглядит системная защита' },
        { list: ['Обследование территории и составление схемы', 'Барьерные приманочные станции по периметру', 'Механические ловушки внутри помещений', 'Регулярный осмотр с фиксацией в журнале', 'Рекомендации по герметизации и хранению'] },
      ),
    }),
    section<FactSection>('fact', { value: 24, decimals: 0, suffix: '+ лет', label: 'НПП «Биохиммаш» обслуживает склады, производства и логистические комплексы', settings: { background: 'card' } }),
    section<GallerySection>('gallery', {
      items: [
        { id: 's1', image: img.warehouse, caption: 'Схема контрольных точек по периметру' },
        { id: 's2', image: img.team, caption: 'Монтаж приманочных станций' },
        { id: 's3', image: img.radar, caption: 'Мониторинг и отчётность' },
        { id: 's4', image: img.centipedeAlt, caption: 'Обследование подвальных помещений' },
      ],
    }),
    section<DividerSection>('divider', { style: 'ornament' }),
    section<TextSection>('text', {
      doc: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [plain('Сколько это стоит')] },
          p(plain('Стоимость зависит от площади, количества точек контроля и периодичности визитов. Ориентиры есть на странице '), link('цен', '/prices'), plain(', а точный расчёт мы делаем после бесплатного осмотра.')),
        ],
      },
    }),
    section<FaqSection>('faq', {
      items: [
        { id: 'w1', question: 'Безопасны ли приманки для товара на складе?', answer: 'Приманки размещаются в закрытых станциях, к которым нет доступа у людей и товара. Схема размещения согласуется с ответственным за склад.' },
        { id: 'w2', question: 'Как часто нужен визит специалиста?', answer: 'Периодичность определяется программой и зависит от объекта; её фиксируют в договоре.' },
      ],
    }),
    ctaDefault,
  ];

  const partnership: Section[] = [
    section<HeroSection>('hero', { variant: 'title-image', image: img.team, subtitle: 'Поддерживаем инициативу, которая объединяет предприятия, научные организации и предпринимателей наукограда.' }),
    section<TextSection>('text', {
      doc: docFromParagraphs(
        'НПП «Биохиммаш» стало генеральным партнёром проекта «Сделано в Жуковском». Мы работаем в городе с 2002 года и считаем важным вкладываться в деловое сообщество, где выросла компания.',
        { h2: 'Зачем это компании' },
        'Проект помогает местным предприятиям находить друг друга, обмениваться опытом и продвигать российские продукты. Для нас это возможность быть ближе к клиентам и партнёрам в Московской области.',
      ),
    }),
    section<ImageSection>('image', { image: img.radar, caption: 'Работаем по Москве и Московской области', layout: 'full', settings: { animation: 'reveal' } }),
    section<QuoteSection>('quote', { text: 'Сильный город — это сильные локальные компании. Мы рады быть частью этой истории.', author: 'Команда НПП «Биохиммаш»' }),
    section<TextSection>('text', {
      doc: {
        type: 'doc',
        content: [
          p(plain('Подробнее о партнёрстве и лицензии — на странице '), link('о компании', '/about'), plain('.')),
        ],
      },
    }),
  ];

  type Block = Parameters<typeof docFromParagraphs>[number];
  const short = (subtitle: string, image: MediaRef, paragraphs: Block[], extra: Section[] = []): Section[] => [
    section<HeroSection>('hero', { variant: 'title-image', image, subtitle }),
    section<TextSection>('text', { doc: docFromParagraphs(...paragraphs) }),
    ...extra,
    ctaDefault,
  ];

  const rows: (Omit<NewArticleRow, 'readingTime'>)[] = [
    {
      title: 'Как подготовить ресторан к проверке Роспотребнадзора по пест-контролю',
      slug: 'kak-podgotovit-restoran-k-proverke-rospotrebnadzora',
      excerpt: 'Чек-лист документов, журналов и контрольных устройств, которые проверяет инспектор, — и почему разовая обработка перед проверкой не спасает.',
      coverImage: img.restaurant, cardSize: 'l', content: restaurant, isFeatured: true,
      publishedAt: daysAgo(3), relatedServices: ['dezinsekciya', 'deratizaciya'],
      seoTitle: 'Подготовка ресторана к проверке Роспотребнадзора',
      seoDescription: 'Какие документы по дезинсекции и дератизации проверяет Роспотребнадзор в ресторане: договор, программа пест-контроля, журналы, акты. Чек-лист.',
    },
    {
      title: 'Признаки клопов в гостинице: что проверить горничной',
      slug: 'priznaki-klopov-v-gostinice',
      excerpt: 'Пять ранних признаков, места, где клопы прячутся чаще всего, и порядок действий, если их нашли в номере.',
      coverImage: img.bedbug, cardSize: 'tall', content: bedbug, accentColor: '#C9A26B',
      publishedAt: daysAgo(9), relatedServices: ['dezinsekciya'],
      seoDescription: 'Как распознать клопов в отеле на раннем этапе: пять признаков, места осмотра, действия персонала. Обработка номерного фонда без закрытия.',
    },
    {
      title: 'Дератизация склада: почему разовой обработки мало',
      slug: 'deratizaciya-sklada',
      excerpt: 'Грызуны возвращаются, если не менять условия. Рассказываем, как устроена системная защита склада и из чего складывается цена.',
      coverImage: img.warehouse, cardSize: 'wide', content: warehouse,
      publishedAt: daysAgo(16), relatedServices: ['deratizaciya'],
    },
    {
      title: 'НПП «Биохиммаш» — генеральный партнёр проекта «Сделано в Жуковском»',
      slug: 'partnerstvo-sdelano-v-zhukovskom',
      excerpt: 'Поддерживаем деловое сообщество наукограда, где работаем с 2002 года.',
      coverImage: img.team, cardSize: 'm', content: partnership, showAtmosphere: false,
      publishedAt: daysAgo(23), relatedServices: [],
    },
    {
      title: 'Тараканы в офисе: откуда берутся и как избавиться навсегда',
      slug: 'tarakany-v-ofise',
      excerpt: 'Кухня, кулер и общие коммуникации — главные причины. Что можно сделать своими силами, а когда нужен специалист.',
      coverImage: img.bugAlt, cardSize: 's',
      content: short('Офисная кухня и общие стояки — главный источник тараканов в бизнес-центрах.', img.bugAlt, [
        'Тараканы приходят из соседних помещений по вентиляции и коммуникациям, а остаются там, где есть вода и крошки. Поэтому борьба только в одном офисе даёт временный результат.',
        { h2: 'Что работает' },
        'Обработка помещения вместе с соседними зонами, барьерные средства и регулярный контроль. Самка рыжего таракана переносит оотеку с несколькими десятками яиц, поэтому важна повторная обработка.',
      ]),
      publishedAt: daysAgo(30), relatedServices: ['dezinsekciya'],
    },
    {
      title: 'Комары на территории загородного отеля: план на сезон',
      slug: 'komary-na-territorii-otelya',
      excerpt: 'Когда начинать обработку территории, сколько раз за лето и как совместить её с отдыхом гостей.',
      coverImage: img.mosquito, cardSize: 'm',
      content: short('Обработка от комаров — сезонная работа, которую лучше планировать заранее.', img.mosquito, [
        'Первую обработку проводят в начале сезона, когда появляются первые личинки, а затем повторяют по графику. Важно обработать водоёмы, кустарник и места отдыха.',
        'Работы выполняются в часы, когда гостей на территории нет, с соблюдением сроков ограничения доступа.',
      ]),
      publishedAt: daysAgo(41), relatedServices: ['dezinsekciya'],
    },
    {
      title: 'Борщевик Сосновского: когда начинать обработку участка',
      slug: 'borshchevik-kogda-obrabatyvat',
      excerpt: 'Оптимальные сроки, сколько обработок нужно за сезон и как восстановить травостой после.',
      coverImage: img.centipedeAlt, cardSize: 'wide',
      content: short('Химическая обработка эффективна до цветения — дальше растение успевает дать семена.', img.centipedeAlt, [
        'Борщевик уничтожают 1–2 обработками за сезон с контролем результата. Первую проводят весной на молодых растениях, повторную — по отрастанию.',
        'После обработки важно восстановить травостой, иначе на освободившемся месте снова прорастут семена из почвы.',
      ], [section<FactSection>('fact', { value: 50, decimals: 0, prefix: '> ', suffix: ' га', label: 'при таких площадях действует скидка на фитосанитарную обработку' })]),
      publishedAt: daysAgo(55), relatedServices: ['fitosanitariya'],
    },
    {
      title: 'Дезинфекция школы перед началом учебного года',
      slug: 'dezinfekciya-shkoly',
      excerpt: 'Какие помещения обрабатывают, какие документы получает учреждение и как уложиться в сроки до 1 сентября.',
      coverImage: img.radar, cardSize: 's',
      content: short('Работаем по утверждённым регламентам для образовательных учреждений.', img.radar, [
        'Перед началом учебного года проводят дезинфекцию пищеблока, санузлов, спортзала и учебных классов, а также профилактическую дезинсекцию и дератизацию.',
        'Учреждение получает акты выполненных работ, необходимые для приёмки школы к учебному году.',
      ]),
      publishedAt: daysAgo(70), relatedServices: ['dezinfekciya'],
    },
    {
      title: 'Что входит в программу пест-контроля для пищевого производства',
      slug: 'programma-pest-kontrolya',
      excerpt: 'Структура программы, роль мониторинга и что должно быть в отчётах для аудиторов и проверяющих.',
      coverImage: img.restaurant, cardSize: 'tall',
      content: short('Программа пест-контроля — основной документ, с которого начинается любая проверка.', img.restaurant, [
        'Программа описывает объект, риски, методы контроля, периодичность и ответственных. К ней прикладываются схема размещения устройств и формы отчётности.',
        'Мы разрабатываем программу под конкретное производство и обновляем её по результатам мониторинга.',
      ]),
      publishedAt: daysAgo(98), relatedServices: ['dezinsekciya', 'deratizaciya', 'dezinfekciya'],
    },
  ];

  await db.insert(articles).values(rows.map((row) => ({
    ...row,
    status: 'published' as const,
    content: row.content ?? [],
    readingTime: computeReadingTime(row.content ?? []),
    updatedAt: row.publishedAt ?? new Date(),
    createdAt: row.publishedAt ?? new Date(),
  })));

  // Черновик под будущее видео: на сайте не виден, ссылку на ролик нужно вставить в админке
  const videoDraft: Section[] = [
    section<HeroSection>('hero', { variant: 'fullscreen', image: img.team, subtitle: 'Первый выезд специалиста: осмотр, замеры и план работ.' }),
    section<VideoSection>('video', { url: '', title: 'Как проходит обследование', poster: img.radar }),
    section<TextSection>('text', { doc: docFromParagraphs('На осмотре специалист определяет вид вредителей, пути проникновения и объём работ. После этого составляется программа и рассчитывается стоимость.') }),
    ctaDefault,
  ];
  await db.insert(articles).values({
    title: 'Видео: как проходит обследование объекта',
    slug: 'video-obsledovanie-obekta',
    excerpt: 'Показываем, что делает специалист на первом выезде и почему без осмотра нельзя назвать точную цену.',
    coverImage: img.team,
    cardSize: 'm',
    status: 'draft',
    content: videoDraft,
    relatedServices: ['dezinsekciya', 'deratizaciya'],
    readingTime: computeReadingTime(videoDraft),
  });

  return true;
}
