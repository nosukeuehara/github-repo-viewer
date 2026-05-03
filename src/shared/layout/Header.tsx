import Link from "next/link";

export function Header() {
  return (
    <header className="bg-blue-400 text-white p-4">
      <Link href="/">
        <h1 className="text-xl font-bold">GitHub Repo Explore</h1>
      </Link>
    </header>
  );
}
