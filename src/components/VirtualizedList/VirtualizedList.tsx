import { ReactNode, useCallback, useReducer } from "react";
import {
  VirtualizedContext,
  VirtualizedContextDispatch,
} from "./VirtualizedContext";
import { initialState, virtualizedReducer } from "./VirtualizedReducer";
import useObservable from "./useObservable";

type VirtualizedListProps = {
  options?: IntersectionObserverInit;
  children: ReactNode;
};

const defaultIntersectionObserverOptions = {
  root: null,
  rootMargin: `1000px 0px 1000px 0px`,
  threshold: 0,
};

const VirtualizedList = ({ options, children }: VirtualizedListProps) => {
  const [observerSubs, dispatchObserverSubs] = useReducer(
    virtualizedReducer,
    initialState
  );

  const onIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const id = entry.target.getAttribute("data-virtualized-id");
        if (!id) return;
        const effect = observerSubs[id];
        effect(entry);
      }
    },
    [observerSubs]
  );

  const { observer } = useObservable(
    onIntersection,
    options || defaultIntersectionObserverOptions
  );

  return (
    <VirtualizedContext.Provider value={observer}>
      <VirtualizedContextDispatch.Provider value={dispatchObserverSubs}>
        {children}
      </VirtualizedContextDispatch.Provider>
    </VirtualizedContext.Provider>
  );
};

export default VirtualizedList;
