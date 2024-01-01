import Link from "next/link";

export default function MealsPage() {
    return(
        <main>
            <h1>Meals</h1>
            <p><Link href="/meals/share-1">Share 1</Link></p>
            <p><Link href="/meals/share-2">Share 2</Link></p>
        </main>
    )
}