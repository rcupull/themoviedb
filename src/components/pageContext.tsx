import { createContext, useContext } from "react";
import { Movie } from "./movies";

interface PageContextProps {
  handleMarkAsFavorite: (movie: Movie) => void;
  showFavoriteCmpBasicInf: boolean;
}

export const PageContext = createContext<Partial<PageContextProps>>({
  handleMarkAsFavorite: (movie: Movie) => {},
  showFavoriteCmpBasicInf: false
});

export function usePageContext() {
  return useContext(PageContext);
}
