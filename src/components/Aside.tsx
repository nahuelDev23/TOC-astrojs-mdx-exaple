import { useState,useEffect } from "preact/hooks";
import { useIndex } from "../hooks/useIndex";

interface Props {
  title:string[];
  subtitles:[string[]];
}
export default function Aside({
  title,
  subtitles,
}:Props) {
  const [active, setActive] = useState<string>(title[0]);
  const [subActive, setSubActive] = useState<string | null>(null);
  const [observer, setInterceptableElement, entries] = useIndex();

 useEffect(() => {
    const sections = document.querySelectorAll("h1[id]");
    sections && setInterceptableElement(sections);
  }, [setInterceptableElement]);

  useEffect(() => {
    (entries as IntersectionObserverEntry[]).forEach(
      (entry: IntersectionObserverEntry) => {
        const id = entry.target.getAttribute("id");
        console.log(id)
        if (entry.intersectionRatio > 0) {
          document
            .querySelector(`li a[href="#${id}"]`)
            ?.parentElement?.classList.add('activeSub');
        } else {
          document
            .querySelector(`li a[href="#${id}"]`)
            ?.parentElement?.classList.remove('activeSub');
        }
      },
    );
  }, [entries, observer]);
  return (
    <ul className="list">
      {title.map((w: string, index: number) => (
        <li
          className={active === w ? "active" : undefined}
          onClick={() => setActive(w)}
        >
          <a href={`#${w}`}>{w}</a>

          <ul>
            {subtitles[index].map((sub: string) => (
              <li
                className={subActive === sub ? "activeSub" : undefined}
                onClick={() => setSubActive(sub)}
              >
                <a href={`#${sub.replaceAll(" ", "-")}`}>{sub}</a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
