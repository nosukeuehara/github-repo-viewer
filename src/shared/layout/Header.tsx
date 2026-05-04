import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-200 ">
      <div className="mx-auto w-full max-w-5xl p-4 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="text-xl font-bold">GitHub Repo Explore</h1>
        </Link>
      </div>
    </header>
  );
}
