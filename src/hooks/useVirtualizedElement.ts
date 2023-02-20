import { useCallback, useEffect, useState } from "react";
import useObservable from "./useObservable";

export function useVirtualizedElement(
  defaultHeight = 300,
  visibleOffset = 1000
) {
  const [isVisible, setIsVisible] = useState(true);
  const [placeholderHeight, setPlaceholderHeight] = useState(defaultHeight);
  const [element, setElement] = useState<any>();

  const waitForElementRef = useCallback(
    () => element && setPlaceholderHeight(element?.offsetHeight),
    [element]
  );

  const elementRef = useCallback((el: any) => {
    if (!el) return;
    if (isVisible) setPlaceholderHeight(el.offsetHeight);
    setElement(el);
  }, []);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    setIsVisible(entries[0].isIntersecting);
  };

  const { observer } = useObservable(handleIntersection, {
    root: null,
    rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px`,
    threshold: 0,
  });

  useEffect(() => {
    if (element) {
      observer.observe(element);
      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }
  }, [element]);

  return {
    isVisible,
    elementRef,
    placeholderHeight,
    waitForElementRef,
  };
}
