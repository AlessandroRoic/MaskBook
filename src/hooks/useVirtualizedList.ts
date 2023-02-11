import useObservable from "./useObservable";
import { useCallback, useMemo, useState } from "react";

export function useVirtualizedList() {
  const [visibleList, setVisibleList] = useState([]);

  const handleVisualization = (entries: IntersectionObserverEntry[]) => {
    if (!entries) return;
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("data-virtualized-id");
      if (entry.isIntersecting) {
        setVisibleList((list) => ({ ...list, id }));
      } else {
        setVisibleList((list) => list.filter((value) => value === id));
      }
    });
  };

  const { observer } = useObservable(handleVisualization);

  const isElementVisible = useCallback(
    (id: string | number) => {
      return Boolean(visibleList.find((value) => value === id));
    },
    [visibleList]
  );

  return {
    observer,
    visibleList,
    isElementVisible,
  };
}
