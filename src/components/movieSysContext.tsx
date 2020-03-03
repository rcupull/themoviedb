import { createContext, useContext } from "react";

export interface MovieSysContextProp {
  imagesURL: string;
  useLocalStorageAsDB: boolean;
  favoriteIndexURL: string;
}

export const MovieSysContext = createContext<Partial<MovieSysContextProp>>({});

export function useMovieSysContext() {
  return useContext(MovieSysContext);
}
