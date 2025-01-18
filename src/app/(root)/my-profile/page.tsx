import { Button } from "@/components/ui/button";
import { signOut } from "../../../../auth";
import { BookList } from "@/components/book-list";
import { sampleBooks } from "@/constants";

export default function Page() {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button>log out</Button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
}
