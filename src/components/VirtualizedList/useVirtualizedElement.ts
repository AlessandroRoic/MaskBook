import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  VirtualizedContext,
  VirtualizedContextDispatch,
} from "./VirtualizedContext";
import { debounce } from "./debounce";

export function useVirtualizedElement(id: string, visibleOffset = 1000) {
  const [isVisible, setIsVisible] = useState(true);
  const [placeholderHeight, setPlaceholderHeight] = useState<
    number | undefined
  >();
  const [element, setElement] = useState<any>();
  const [finishedLoading, setFinishedLoading] = useState(false);
  const observer = useContext(VirtualizedContext);
  const dispatchObserverSub = useContext(VirtualizedContextDispatch);

  const elementRef = useCallback((el: any) => {
    if (!el) return;
    el.setAttribute("data-virtualized-id", id);
    setElement(el);
  }, []);

  const onResize = useCallback(
    debounce((entries: ResizeObserverEntry[]) => {
      if (!isVisible) return;
      const target = entries[0].target as HTMLElement;
      setPlaceholderHeight(target.offsetHeight);
      setFinishedLoading(true);
      resizeObserver.unobserve(target);
      resizeObserver.disconnect();
    }, 1000),
    []
  );

  const resizeObserver = useMemo(() => new ResizeObserver(onResize), []);

  const handleIntersection = (entry: IntersectionObserverEntry) => {
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    dispatchObserverSub({ id, effect: handleIntersection });
  }, []);

  useEffect(() => {
    if (element) {
      resizeObserver.observe(element);
      if (finishedLoading) observer.observe(element);
      return () => {
        if (element) {
          observer.unobserve(element);
          resizeObserver.unobserve(element);
        }
      };
    }
  }, [element, finishedLoading]);

  return {
    isVisible,
    elementRef,
    placeholderHeight,
  };
}
