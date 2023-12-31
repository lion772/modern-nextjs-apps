import Link from "next/link";

export default function BlogPage() {
    const postList = ['post-1', 'post-2'];
    return(
        <main>
            <h1>The Blog</h1>
            {postList.map((post) => (
                <div>
                    <Link href={`/blogs/${post}`}>{post}</Link>
                </div>
            ))}
            <p></p>
        </main>
    )
}