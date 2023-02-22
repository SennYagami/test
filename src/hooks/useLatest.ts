import { useEffect, useRef } from 'react';

export default function useLatest<T>(value: T): React.MutableRefObject<T> {
  const ref = useRef(value);
  useEffect(() => {
    // why not write `fnRef.current = fn`?
    // https://github.com/alibaba/hooks/issues/728
    // https://github.com/facebook/react/issues/14099#issuecomment-440013892
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref.current = (0, value);
  });
  return ref;
}
