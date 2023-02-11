import { ReactNode, useEffect, useRef, useState } from "react";

type VirtualizedElementProps = {
  observer: IntersectionObserver;
  children: ReactNode;
  id: number | string;
  isVisible: boolean;
};

export default function VirtualizedElement({
  observer,
  children,
  id,
  isVisible,
}: VirtualizedElementProps) {
  const [height, setHeight] = useState();
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [elementRef]);

  useEffect(() => {
    if (elementRef.current) setHeight(elementRef.current.offsetHeight);
  }, [elementRef, isVisible]);

  return (
    <>
      {isVisible ? (
        <div ref={elementRef} data-virtualized-id={id}>
          {children}
        </div>
      ) : (
        <div style={height}></div>
      )}
    </>
  );
}
