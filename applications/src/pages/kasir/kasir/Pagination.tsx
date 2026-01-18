import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps){
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
      {/* INFO */}
      <span>
        Menampilkan halaman {currentPage} dari {totalPages}
      </span>

      {/* PAGINATION */}
      <div className="flex items-center gap-2">
        {/* PREV */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full border
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-gray-100"
        >
          <ChevronLeft size={16} />
        </button>

        {/* PAGE NUMBER */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full border text-sm font-medium
              ${
                page === currentPage
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        ))}

        {/* NEXT */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full border
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-gray-100"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

