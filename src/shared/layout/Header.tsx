import Link from "next/link";

export function Header() {
  return (
    <header className="p-4 border-b border-gray-200">
      <Link href="/">
        <h1 className="text-xl font-bold">GitHub Repo Explore</h1>
      </Link>
    </header>
  );
}
