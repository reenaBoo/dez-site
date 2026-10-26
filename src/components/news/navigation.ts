'use client';

// Возврат из статьи в сетку: при клике по карточке запоминаем страницу сетки и скролл.
// Кнопка «Все статьи» возвращает туда же через router.push с типом перехода `news-back`
// (у popstate нет типа и View Transition не запускается), а сетка восстанавливает скролл
// до отрисовки — обложка «втягивается» обратно в свою карточку.

const RETURN_KEY = 'news:return';
const RESTORE_KEY = 'news:restore-scroll';

interface ReturnPoint {
  path: string;
  y: number;
}

const isGridPath = (path: unknown): path is string =>
  typeof path === 'string' && /^\/news(\/page\/\d{1,4})?$/.test(path);

export function rememberGridPosition() {
  try {
    const point: ReturnPoint = { path: window.location.pathname, y: Math.round(window.scrollY) };
    if (isGridPath(point.path)) sessionStorage.setItem(RETURN_KEY, JSON.stringify(point));
  } catch {
    // sessionStorage недоступен (приватный режим) — вернёмся обычной ссылкой
  }
}

// Вызывается кнопкой «Все статьи»: возвращает путь сетки и ставит флаг восстановления скролла
export function takeReturnPoint(): string | null {
  try {
    const raw = sessionStorage.getItem(RETURN_KEY);
    if (!raw) return null;
    const point = JSON.parse(raw) as Partial<ReturnPoint>;
    if (!isGridPath(point.path) || typeof point.y !== 'number') return null;
    sessionStorage.removeItem(RETURN_KEY);
    sessionStorage.setItem(RESTORE_KEY, String(point.y));
    return point.path;
  } catch {
    return null;
  }
}

export function consumeScrollRestore(): number | null {
  try {
    const raw = sessionStorage.getItem(RESTORE_KEY);
    sessionStorage.removeItem(RESTORE_KEY);
    const y = raw === null ? NaN : Number(raw);
    return Number.isFinite(y) ? y : null;
  } catch {
    return null;
  }
}

// Есть ли отложенное восстановление скролла (без извлечения) — сетка в этом случае
// показывается сразу, без reveal-анимации. При прямом заходе флага нет — как и на сервере
export function hasScrollRestore(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(RESTORE_KEY) !== null;
  } catch {
    return false;
  }
}
