import { useEffect, useRef, useState, MutableRefObject } from "preact/hooks";

const DEFAULT_OPTIONS = {
  //root: null,
  rootMargin:"100px 0px 0px 0px"
  //threshold: 0,
};

export const useIndex = (options = DEFAULT_OPTIONS) => {
  const [entries, setEntries] = useState<any>([]);
  const [interceptableElement, setInterceptableElement] = useState<any>([]);
  // Is needed for nextJs
  let observer: MutableRefObject<IntersectionObserver> | null = null;

  // IntersectionObverse only works client-side
  if (typeof window !== "undefined") {
    observer = useRef(
      new IntersectionObserver((observerEntries) => {
        // which element is it interacting with now?
        setEntries(observerEntries);
      },options),
    );
  }

  useEffect(() => {
    const { current: observe } = observer!;

    observe.disconnect();

    if (interceptableElement.length > 0) {
      // what elements will be observed?
      interceptableElement.forEach((element: any) => {
        observe.observe(element!);
      });
    }

    return () => {
      if (observe) {
        observe.disconnect();
      }
    };
  }, [interceptableElement]);

  return [observer?.current, setInterceptableElement, entries];
};
