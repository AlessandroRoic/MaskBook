import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import useObservable from "../../hooks/useObservable";
import { SyncLoader } from "react-spinners";

type InfiniteScrollProps = {
  children: Array<ReactNode> | ReactNode;
  callBack: Function;
};

export function InfiniteScroll({ children, callBack }: InfiniteScrollProps) {
  const loadingRef = useRef(null);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const entry = entries[0];
      if (!entry || !entry.isIntersecting) return;
      observer.unobserve(entry.target);
      callBack();
    },
    [callBack]
  );
  const { observer } = useObservable(handleObserver);

  useEffect(() => {
    if (loadingRef && loadingRef.current) {
      observer.observe(loadingRef.current);
    }
  }, [loadingRef, handleObserver]);

  return (
    <>
      {children}
      {children && (
        <div ref={loadingRef} style={{ marginBottom: 20 }}>
          <SyncLoader color="#E4E6EB" size={10} />
        </div>
      )}
    </>
  );
}
