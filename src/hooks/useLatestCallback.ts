import { useCallback } from 'react';

import useLatest from './useLatest';

// https://github.com/facebook/react/issues/14099#issuecomment-440013892
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useLatestCallback<T extends (...args: any[]) => any>(
  fn?: T,
): (...args: Parameters<T>) => ReturnType<T> {
  const ref = useLatest(fn);
  return useCallback<(...args: Parameters<T>) => ReturnType<T>>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (...args) => ref.current?.(...args),
    [ref],
  );
}
