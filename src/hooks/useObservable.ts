import { useEffect, useMemo } from "react";

export default function useObservable(
  callback: IntersectionObserverCallback,
  observerOptions?: IntersectionObserverInit
) {
  const options = useMemo(
    () =>
      observerOptions
        ? observerOptions
        : {
            root: null,
            rootMargin: "0px",
            threshold: 0,
          },
    [observerOptions]
  );

  const observer = useMemo(
    () => new IntersectionObserver(callback, options),
    [callback]
  );

  useEffect(() => {
    return () => observer.disconnect();
  }, []);

  return {
    observer,
  };
}
