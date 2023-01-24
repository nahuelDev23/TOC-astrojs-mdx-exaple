import type { SearchDefinition } from "../interfaces/SearchDefinition";

interface Props {
  readonly results: readonly SearchDefinition[];
}
export const SearchResultList = ({ results }: Props) => (
  <ul>
    {results.map((result) => (
      <li key={result.primary}>
        {result.url ? (
          <a href={result.url}>{result.primary}</a>
        ) : (
          <span>{result.primary}</span>
        )}
      </li>
    ))}
  </ul>
);
