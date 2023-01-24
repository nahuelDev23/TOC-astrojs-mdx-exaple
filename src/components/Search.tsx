import { useState } from "preact/hooks";
import { useFuse } from "../hooks/useFuse";
import type Fuse from "fuse.js";
import type { SearchDefinition } from "../interfaces/SearchDefinition";
import { SearchResultCount } from "./SearchResultCount";
import { SearchResultList } from "./SearchResultList";

export const Search = ({
  list,
}: {
  readonly list: readonly SearchDefinition[];
}) => {
  const [collection] = useState<readonly SearchDefinition[]>(list);
  const options: Fuse.IFuseOptions<SearchDefinition> = {
    keys: ["primary", "secondary", "tertiary"],
  };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = useFuse<SearchDefinition>({
    collection,
    searchTerm,
    options,
  }).map<SearchDefinition>((result) => ({
    primary: result.item.primary,
    secondary: result.item.secondary,
    url: result.item.url,
  }));
  const filteredListTop = filteredList.slice(0, 20);

  return (
    <>
      <input
        id="search"
        name="search"
        type="search"
        autocomplete="off"
        placeholder="Search by title or description or tags"
        onInput={(event) =>
          setSearchTerm((event.target as HTMLInputElement).value)
        }
      />

      <SearchResultCount results={filteredList} />
      <SearchResultList results={filteredListTop} />
    </>
  );
};
