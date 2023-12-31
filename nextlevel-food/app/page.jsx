import Link from "next/link";
import Header from "@/components/header";

export default function Home() {
  return (
    <main>
        <Header />
        <Link href="/about">About Us</Link>
        <Link href="/blogs">Blogs</Link>
    </main>
  );
}
