import React, { Fragment } from "react";
import { Pagination as Pag } from "react-bootstrap";
import _ from "lodash";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleChangeCurrentPage: (page: number) => void;
}

const pagesAdyacent = 3;

const Pagination: React.SFC<PaginationProps> = ({
  currentPage,
  totalPages,
  handleChangeCurrentPage
}) => {
  if (typeof currentPage === "undefined" || typeof totalPages === "undefined") {
    return <Fragment />;
  }

  if (totalPages === 1) {
    return <Fragment />;
  }

  const showShortPagination = () => {
    let pages = _.range(1, totalPages + 1);

    return (
      <Pag>
        {pages.map(page => (
          <Pag.Item
            onClick={() => {
              if (handleChangeCurrentPage) handleChangeCurrentPage(page);
            }}
            key={page}
            active={currentPage === page ? true : false}
          >
            {page}
          </Pag.Item>
        ))}
      </Pag>
    );
  };

  const showLargePagination = () => {
    let pages =
      currentPage <= pagesAdyacent
        ? _.range(1, 2 * pagesAdyacent + 2)
        : currentPage >= totalPages - pagesAdyacent
        ? _.range(totalPages - 2 * pagesAdyacent, totalPages + 1)
        : _.range(currentPage - pagesAdyacent, currentPage + pagesAdyacent + 1);

    return (
      <Pag>
        <Pag.First
          onClick={() => {
            console.log("page", 1);
            if (handleChangeCurrentPage) handleChangeCurrentPage(1);
          }}
        />
        {pages.map(page => (
          <Pag.Item
            onClick={() => {
              if (handleChangeCurrentPage) handleChangeCurrentPage(page);
            }}
            key={page}
            active={currentPage === page ? true : false}
          >
            {page}
          </Pag.Item>
        ))}
        <Pag.Last
          onClick={() => {
            if (handleChangeCurrentPage) handleChangeCurrentPage(totalPages);
          }}
        />
      </Pag>
    );
  };

  return totalPages < 10 ? showShortPagination() : showLargePagination();
};

export default Pagination;
