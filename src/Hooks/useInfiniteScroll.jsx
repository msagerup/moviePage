import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = (callback) => {
  const targetRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          callback();
          setIsLoading(false);
        }
      },
      { rootMargin: "30px 0px" }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [callback, isLoading]);

  return targetRef;
};

export default useInfiniteScroll;
