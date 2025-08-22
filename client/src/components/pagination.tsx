import { type  PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Dropdown from "./dropdown";
import { DropdownMenu , DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
// import MaterialIcon from "./ui/material-icon";

interface IProps {
  length: number;
  paginationState: PaginationState;
  onPaginationChange: (state: PaginationState) => void;
}

const Pagination = (props: IProps) => {
  const { length, paginationState, onPaginationChange } = props;
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(paginationState.pageSize);
  const [firstPage, setFirstPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    setItemsPerPage(paginationState.pageSize);
  }, [paginationState.pageSize]);

  useEffect(() => {
    const totalPages =
      length % itemsPerPage === 0
        ? length / itemsPerPage
        : Math.floor(length / itemsPerPage) + 1;
    setTotalNumberOfPages(totalPages);

    if (totalPages <= 5) {
      setFirstPage(1);
      setLastPage(totalPages);
    } else if (paginationState.pageIndex <= 3) {
      setFirstPage(1);
      setLastPage(5);
    } else if (paginationState.pageIndex > totalPages - 3) {
      setFirstPage(totalPages - 4);
      setLastPage(totalPages);
    } else {
      setFirstPage(paginationState.pageIndex - 2);
      setLastPage(paginationState.pageIndex + 2);
    }
  }, [length, itemsPerPage, paginationState.pageIndex]);

  return length > 0 ? (
    <div className="flex items-center gap-5 justify-center">
      <div className="flex items-center gap-2">
        <div
          className="h-[25px] w-[25px] rounded bg-primary cursor-pointer flex items-center justify-center"
          onClick={() => {
            if (paginationState.pageIndex - 1 >= 1) {
              onPaginationChange({
                pageIndex: paginationState.pageIndex - 1,
                pageSize: itemsPerPage,
              });
            }
          }}
        >
          {/* <MaterialIcon
            icon="chevron_left"
            className="text-white flex justify-center items-center"
            size="sm"
          /> */}
          <h4>icon</h4>
        </div>
        {lastPage >= 6 && firstPage !== 1 && (
          <div
            className={`cursor-pointer flex justify-center items-center h-[25px] w-[25px] rounded ${
              totalNumberOfPages > 6 ? "hidden sm:flex" : ""
            }`}
            onClick={() => {
              onPaginationChange({ pageIndex: 1, pageSize: itemsPerPage });
            }}
          >
            <p
              className={`text-[14px] ${
                paginationState.pageIndex === 1
                  ? `text-primary font-bold`
                  : `text-text-secondary`
              } mb-0`}
            >
              {1}
            </p>
          </div>
        )}
        {lastPage > 6 && firstPage !== 2 && (
          <div className={`h-[25px] w-[25px] rounded hidden sm:block`}>
            <p
              className={`text-[14px] text-text-secondary flex justify-center items-center mb-0`}
            >
              ...
            </p>
          </div>
        )}
        {Array.from(Array(lastPage - (firstPage - 1)).keys()).map((index) => {
          return (
            <div
              key={index}
              className={`hidden cursor-pointer sm:flex justify-center items-center h-[25px] w-[25px] rounded`}
              onClick={() => {
                onPaginationChange({
                  pageIndex: firstPage + index,
                  pageSize: itemsPerPage,
                });
              }}
            >
              <p
                className={`text-[14px] ${
                  paginationState.pageIndex === firstPage + index
                    ? `text-primary font-bold`
                    : `text-text-secondary`
                } mb-0`}
              >
                {firstPage + index}
              </p>
            </div>
          );
        })}
        <div
          className={`block sm:hidden cursor-pointer flex justify-center items-center h-[25px] w-[25px] rounded`}
        >
          <p className={`text-[14px] text-primary font-bold mb-0`}>
            {paginationState.pageIndex}
          </p>
        </div>
        {firstPage < totalNumberOfPages - 5 &&
          lastPage !== totalNumberOfPages - 1 && (
            <div className={`h-[25px] w-[25px] rounded hidden sm:block`}>
              <p
                className={`text-[14px] text-text-secondary flex justify-center items-center mb-0`}
              >
                ...
              </p>
            </div>
          )}
        {firstPage <= totalNumberOfPages - 5 &&
          lastPage !== totalNumberOfPages && (
            <div
              className={`cursor-pointer flex justify-center items-center h-[25px] w-[25px] rounded ${
                totalNumberOfPages > 6 ? "hidden sm:flex" : ""
              }`}
              onClick={() => {
                onPaginationChange({
                  pageIndex: totalNumberOfPages,
                  pageSize: itemsPerPage,
                });
              }}
            >
              <p
                className={`text-[14px] ${
                  paginationState.pageIndex === totalNumberOfPages
                    ? `text-primary font-bold`
                    : `text-text-secondary`
                } mb-0`}
              >
                {totalNumberOfPages}
              </p>
            </div>
          )}

        <div
          className="h-[25px] w-[25px] rounded bg-primary cursor-pointer flex items-center justify-center"
          onClick={() => {
            if (paginationState.pageIndex + 1 <= totalNumberOfPages) {
              onPaginationChange({
                pageIndex: paginationState.pageIndex + 1,
                pageSize: itemsPerPage,
              });
            }
          }}
        >
          {/* <MaterialIcon
            icon="chevron_right"
            className="text-white flex justify-center items-center"
            size="sm"
          /> */}
          <h4>icon here</h4>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="border-none outline-none rounded-lg"
          asChild
        >
          <div className="flex items-center cursor-pointer">
            {itemsPerPage} items per page
            {/* <MaterialIcon
              icon="arrow_drop_down"
              color="var(--primary)"
              className=""
            /> */}
            <h4>icon </h4>
          </div>
        </DropdownMenuTrigger>
        <Dropdown
          dropdownItems={[
            {
              id: 1,
              text: "10 items per page",
              onClick: () => {
                onPaginationChange({
                  pageIndex: paginationState.pageIndex,
                  pageSize: 10,
                });
              },
            },
            {
              id: 2,
              text: "20 items per page",
              onClick: () => {
                onPaginationChange({
                  pageIndex: paginationState.pageIndex,
                  pageSize: 20,
                });
              },
            },
            {
              id: 3,
              text: "30 items per page",
              onClick: () => {
                onPaginationChange({
                  pageIndex: paginationState.pageIndex,
                  pageSize: 30,
                });
              },
            },
            {
              id: 4,
              text: "40 items per page",
              onClick: () => {
                onPaginationChange({
                  pageIndex: paginationState.pageIndex,
                  pageSize: 40,
                });
              },
            },
            {
              id: 5,
              text: "50 items per page",
              onClick: () => {
                onPaginationChange({
                  pageIndex: paginationState.pageIndex,
                  pageSize: 50,
                });
              },
            },
          ]}
        />
      </DropdownMenu>
    </div>
  ) : (
    <></>
  );
};

export default Pagination;