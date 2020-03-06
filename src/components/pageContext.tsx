import { createContext, useContext } from "react";
import { Movie } from "./movies";

interface PageContextProps {
  handleMarkAsFavorite: (movie: Movie) => void;
  showFavoriteCmp: boolean;
}

export const PageContext = createContext<Partial<PageContextProps>>({
  handleMarkAsFavorite: (movie: Movie) => {},
  showFavoriteCmp: false
});

export function usePageContext() {
  return useContext(PageContext);
}
