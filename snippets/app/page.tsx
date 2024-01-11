import Link from "next/link";
import { getSnippets } from "@/db/actions";

async function Pages() {
    const snippets = await getSnippets();

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                <tr>
                    <th className="py-2 px-4 border-b">Snippets</th>
                </tr>
                </thead>
                <tbody className="text-gray-700">
                {snippets.map((snippet) => (
                    <tr key={snippet.id} className="hover:bg-gray-100 transition duration-75">
                        <td className="py-2 px-4 border-b">
                            <Link
                                href={`/snippets/${snippet.id}`}
                                className="flex justify-between items-center p-2 rounded">
                                    <span
                                        className="text-blue-500 mx-auto">
                                        {snippet.title}
                                    </span>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default function Home() {
    return (
        <div className="p-8">
            <Link href={'/snippets/new'}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'>Create a new snippet</button>
            </Link>
            <Pages />
        </div>
    );
}
