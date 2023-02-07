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

export const sliceNftsByCount = (arr: any[], count: number) => {
  const sliceNum = Math.ceil(arr.length / count);
  const slicedNfts = new Array(sliceNum).fill('', 0).map((_, i) => arr.slice(i * count, (i + 1) * count));
  return { sliceNum, slicedNfts };
};
