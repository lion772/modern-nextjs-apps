import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';
import classes from './page.module.css';

export async function generateMetadata({ params }) {
    const meal = getMeal(params.mealSlug);

    if (!meal) {
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary,
    };
}

export default function MealDetailsPage({ params }) {
    const meal = getMeal(params.mealSlug);

    if (!meal) {
        notFound();
    }
    meal.instructions = meal.instructions.replace(/\n/g, '<br />');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image
                        src={`https://williamsteinke-nextjs-nextfoodlevel.s3.eu-central-1.amazonaws.com/${meal.image}`}
                        alt={meal.title}
                        fill
                    />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                {/* 'dangerouslySetInnerHTML' will allow you to insert raw HTML content into your React component, which can expose your application to potential
                 security risks, such as cross-site scripting (XSS) attacks */}
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{
                        __html: meal.instructions,
                    }}
                ></p>
            </main>
        </>
    );
}