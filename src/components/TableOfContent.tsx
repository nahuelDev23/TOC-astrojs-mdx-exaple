import { useEffect, useState } from "preact/hooks";
import { useHeadsObserver } from "../hooks/useHeadsObserver";

import "./tableOfContent.css";
const TableOfContent = () => {
  const [headings, setHeadings] = useState<any[]>([]);
  const { activeId } = useHeadsObserver();

  const scrollToSection = (e: any, id: string) => {
    e.preventDefault();

    document.querySelector(`#${id}`)!.scrollIntoView({
      behavior: "smooth",
    });
  };

  const getClassName = (level: number) => {
    switch (level) {
      case 2:
        return "head2";
      case 3:
        return "head3";
      case 4:
        return "head4";
      default:
        return null;
    }
  };

  useEffect(() => {
    const elements = (
      Array.from(document.querySelectorAll("h2, h3, h4")) as HTMLInputElement[]
    ).map((elem) => ({
      id: elem.id,
      text: elem.innerText,
      level: Number(elem.nodeName.charAt(1)),
    }));
    setHeadings(elements);
  }, []);

  return (
    <nav>
      <ul>
        {headings.map((heading) => (
          <li key={heading.text} className={getClassName(heading.level)!}>
            <a
              href={`{#${heading.id}}`}
              onClick={(e) => scrollToSection(e, heading.id)}
              style={{
                fontWeight: activeId === heading.id ? "bold" : "normal",
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default TableOfContent;
