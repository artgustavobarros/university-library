import { BookList } from "@/components/book-list";
import { BookOverview } from "@/components/book-overview";
import { sampleBooks } from "@/constants";

export default function Home() {
  return (
    <>
      <BookOverview book={sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
}
