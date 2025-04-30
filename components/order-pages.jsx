import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const OrderPaginationComponent = ({ currentPage, totalPages }) => {
  // Create an array for page numbers to render
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
      {/* Previous Button - Only Show if NOT on First Page */}
      {currentPage > 1 && (
        <PaginationItem>
          <PaginationPrevious
              href={`?page=${currentPage - 1}`}
          />
        </PaginationItem>
      )}

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`?page=${page}`}
              isActive={page === currentPage}
              // onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

    
        {/* Next Button - Only Show if NOT on Last Page */}
        {currentPage < totalPages && (
        <PaginationItem>
          <PaginationNext
             href={`?page=${currentPage + 1}`}
          />
        </PaginationItem>
      )}
      </PaginationContent>
    </Pagination>
  );
};

export default OrderPaginationComponent;
