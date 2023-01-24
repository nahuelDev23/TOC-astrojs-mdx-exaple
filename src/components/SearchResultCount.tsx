import type { SearchDefinition } from "../interfaces/SearchDefinition";

interface Props {
readonly results: readonly SearchDefinition[]
}
export const SearchResultCount = ({ results }: Props) => {
    const hasResults = results.length > 0;

    return hasResults
        ? <div>{results.length} results found</div>
        : null;
};
