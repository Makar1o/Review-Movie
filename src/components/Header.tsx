import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 border-b">
      <h2 className=" text-blue-950 text-2xl font-bold">LOGO</h2>
      <Link href="add-movie">
        <button className="cursor-pointer bg-blue-950 text-white p-4 rounded-xl ">
          Add Movie
        </button>
      </Link>
    </header>
  );
}
