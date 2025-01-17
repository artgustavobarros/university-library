import Link from "next/link";
import { BookCover } from "./book-cover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

export function BookCard({ book }: { book: Book }) {
  return (
    <li className={cn(book.isLoanedBook && "xs:w-52 w-full")}>
      <Link
        href={`/books/${book.id}`}
        className={cn(book.isLoanedBook && "w-full flex flex-col items-center")}
      >
        <BookCover coverColor={book.coverColor} coverUrl={book.coverUrl} />
        <div
          className={cn("mt-4", !book.isLoanedBook && "xs:max-w-40 max-w-28")}
        >
          <p className="book-title">{book.title}</p>
          <p className="book-genre">{book.genre}</p>
        </div>

        {book.isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left to return </p>
            </div>
            <Button className="book-btn hover:bg-dark-600">
              Download receipt
            </Button>
          </div>
        )}
      </Link>
    </li>
  );
}
