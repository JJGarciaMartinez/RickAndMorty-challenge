import { useRef, useEffect, useCallback } from "react";

const useObserver = (handleObserver: () => void, loading: boolean) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLLIElement | null>(null);

  const observeCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !loading) {
        handleObserver();
      }
    },
    [handleObserver, loading]
  );

  useEffect(() => {
    if (lastElementRef.current) {
      observer.current = new IntersectionObserver(observeCallback, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      });
      observer.current.observe(lastElementRef.current);
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [observeCallback]);

  return { lastElementRef };
};

export default useObserver;
