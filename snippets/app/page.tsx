import Link from "next/link";
import getSnippets from "@/db/snippets";

function Pages() {
    const snippets = getSnippets();
    return <ul>
    {snippets.map((snippet) => (
        <li key={snippet.name}>
            {snippet.name}
        </li>
    ))}
    </ul>;
}

export default function Home() {
  return (
      <>
          <Link href={'/snippets/new'}>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>New</button>
          </Link>
          <Pages />
      </>
  )
}
