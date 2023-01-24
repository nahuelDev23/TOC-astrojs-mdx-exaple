import Fuse from "fuse.js";
import { useMemo } from "preact/hooks";

export const useFuse = <T>({
  collection,
  searchTerm,
  options,
}: {
  readonly collection: readonly T[];
  readonly searchTerm: string;
  readonly options: Fuse.IFuseOptions<T>;
}) => {
  const fuse = useMemo(() => {
    return new Fuse(collection, options);
  }, [collection, options]);

  const results = useMemo(() => {
    return fuse.search(searchTerm);
  }, [fuse, searchTerm]);

  return results;
};
