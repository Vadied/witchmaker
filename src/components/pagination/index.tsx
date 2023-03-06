import React from "react";
import { ImFirst, ImPrevious2, ImNext2, ImLast } from "react-icons/im";

import Button from "@/components/button";
import { range } from "@/utils/utils";

type Props = {
  totalRecords: number;
  pageLimit: number;
  pageRange: number;
  onPageChange(page: number): void;
  currentPage: number;
};
const Pagination = ({
  totalRecords = 0,
  pageLimit = 10,
  pageRange = 2,
  onPageChange,
  currentPage = 1,
}: Props) => {
  const totalPages = Math.ceil(totalRecords / pageLimit);

  if (totalPages <= 1) return <div></div>;

  const startPage = currentPage - pageRange > 0 ? currentPage - pageRange : 1;
  const endPage =
    currentPage + pageRange < totalPages ? currentPage + pageRange : totalPages;

  const changePage = (page: number) => async () => {
    if (page < 1 || page === currentPage || page > totalPages) return;

    await onPageChange(page);
  };

  const renderBtn = (page: number, index: number) => {
    return (
      <Button
        key={index}
        type="primary"
        handleClick={changePage(page)}
        enabled={currentPage !== page}
      >
        {`${page}`}
      </Button>
    );
  };

  const pagination = () => range(endPage + 1, startPage).map(renderBtn);

  return (
    <div className="pagination flex justify-center mt-4 gap-2">
      <Button
        type="primary"
        handleClick={changePage(1)}
        enabled={currentPage !== 1}
      >
        <ImFirst />
      </Button>

      <Button
        type="primary"
        handleClick={changePage(currentPage - 1)}
        enabled={currentPage !== 1}
      >
        <ImPrevious2 />
      </Button>

      {startPage !== 1 && <div className="disabled p-3">...</div>}

      {pagination()}

      {endPage !== totalPages && <div className="disabled p-3">...</div>}

      <Button
        type="primary"
        handleClick={changePage(currentPage + 1)}
        enabled={currentPage !== totalPages}
      >
        <ImNext2 />
      </Button>

      <Button
        type="primary"
        handleClick={changePage(totalPages)}
        enabled={currentPage !== totalPages}
      >
        <ImLast />
      </Button>
    </div>
  );
};

export default Pagination;
