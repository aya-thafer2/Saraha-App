import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ users, changePageNumber, pageNumber, pageSize }) => {
  const pageCount = Math.ceil(users.length / pageSize);
  if (pageCount === 1) return <></>;

  const pages = _.range(0, pageCount);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li
              className={page === pageNumber ? "page-item active" : "page-item"}
              key={page}
              onClick={() => changePageNumber(page)}
            >
              <Link className="page-link" to="#">
                {page + 1}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
