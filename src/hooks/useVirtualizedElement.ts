import { useEffect, useRef, useState } from "react";
import useObservable from "./useObservable";

export function useVirtualizedElement(
  defaultHeight = 300,
  visibleOffset = 1000
) {
  const [isVisible, setIsVisible] = useState(true);
  const [placeholderHeight, setPlaceholderHeight] = useState(defaultHeight);
  const elementRef = useRef<HTMLElement>(null);
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    setIsVisible(entries[0].isIntersecting);
  };
  const { observer } = useObservable(handleIntersection, {
    root: null,
    rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px`,
    threshold: 0,
  });

  useEffect(() => {
    if (elementRef.current) {
      observer.observe(elementRef.current);
      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }
  }, [elementRef]);

  useEffect(() => {
    if (elementRef.current && isVisible) {
      setPlaceholderHeight(elementRef.current.offsetHeight);
    }
  }, [isVisible, elementRef]);

  return {
    isVisible,
    elementRef,
    placeholderHeight,
  };
}
