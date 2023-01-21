import { useEffect, useRef, useState } from "preact/hooks";

export function useHeadsObserver() {
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleObsever = (entries:IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "-20% 0% -35% 0px",
    });

    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach((elem:Element) => observer.current?.observe(elem));

    return () => observer.current?.disconnect();
  }, []);

  return { activeId };
}
