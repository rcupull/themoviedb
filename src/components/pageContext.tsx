import { createContext, useContext } from "react";
import { Movie } from "./movies";

interface PageContextProps {
  handleFavoriteChange: (movie: Movie) => void;
  showFavoriteCmp: boolean;
}

export const PageContext = createContext<Partial<PageContextProps>>({
  handleFavoriteChange: (movie: Movie) => {},
  showFavoriteCmp: false
});

export function usePageContext() {
  return useContext(PageContext);
}
