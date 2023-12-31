import Link from "next/link";

export default function BlogPostPage({params}) {
    console.log("PARAMS: ", params)
    return(
        <main>
            <h1>The Post</h1>
            <h2>{params.slug}</h2>
        </main>
    )
}