import { useState, useEffect, useRef } from "react";

export default function useOnScreen(options) {
  const ref = useRef(null);
  // State and setter for storing whether element is visible
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update our state when observer callback fires
      setVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]); // Empty array ensures that effect is only run on mount and unmount

  return [ref, visible];
}
