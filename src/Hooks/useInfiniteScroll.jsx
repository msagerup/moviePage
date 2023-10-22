import { useEffect, useRef } from "react";

const useInfiniteScroll = (callback) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [callback]);

  return targetRef;
};

export default useInfiniteScroll;
