import { RefObject } from 'react';

type DOMRectProperty = keyof Omit<DOMRect, 'toJSON'>;

export const getElementProperty = <T extends HTMLElement>(
  elementRef: RefObject<T>,
  property: DOMRectProperty
): number => {
  const clientRect = elementRef.current?.getBoundingClientRect();
  if (clientRect) return clientRect[property];
  return 0;
};
