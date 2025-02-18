import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({ currentPage, lastPage, onPageChange }: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        
        <PaginationItem>
          <PaginationPrevious
            className={`cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {[...Array(lastPage > 0 ? lastPage : 1)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={currentPage === index + 1}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={`cursor-pointer ${currentPage === lastPage ? "pointer-events-none opacity-50" : ""}`}
            onClick={() => currentPage < lastPage && onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
