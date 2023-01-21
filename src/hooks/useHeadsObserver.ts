import { useEffect, useRef, useState } from "preact/hooks";

export function useHeadsObserver() {
  const observer = useRef<any>(null);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleObsever = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "-20% 0% -35% 0px",
    });

    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach((elem) => observer.current.observe(elem));

    return () => observer.current?.disconnect();
  }, []);

  return { activeId };
}
