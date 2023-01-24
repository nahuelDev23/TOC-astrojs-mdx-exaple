import type { SearchDefinition } from "../interfaces/SearchDefinition";

export const SearchResultList = ({
  results,
}: {
  readonly results: readonly SearchDefinition[];
}) => (
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
