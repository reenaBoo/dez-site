export const METRIKA_ID = 106199264;

type YmFn = (id: number, method: string, ...args: unknown[]) => void;

// Отправка цели в Яндекс.Метрику. Если счётчик ещё не загрузился (lazyOnload),
// вызов встаёт в очередь ym.a и уйдёт после инициализации
export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { ym?: YmFn & { a?: unknown[] } };
  if (!w.ym) {
    const queue: unknown[] = [];
    const stub = ((...args: unknown[]) => { queue.push(args); }) as YmFn & { a?: unknown[] };
    stub.a = queue;
    w.ym = stub;
  }
  w.ym(METRIKA_ID, 'reachGoal', goal, params);
}
