import Link from "next/link";

export default function MealsSharePage({params}) {
    return(
        <main>
            <h1>Meal Slug</h1>
            <h2>{params.mealSlug}</h2>
        </main>
    )
}