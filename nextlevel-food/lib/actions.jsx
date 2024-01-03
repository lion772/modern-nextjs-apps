'use server';

import {saveMeal} from "@/lib/meals";
import {redirect} from "next/navigation";
import {revalidatePath, revalidateTag} from "next/cache";

export default async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }

    if (isInvalidText(meal)) {
        return {
            message: 'Invalid input.'
        };
    }

    await saveMeal(meal);
    //this function tells NextJS to revalidate (to throw away) the cache that belongs to a certain route path.
    revalidatePath('/meals');
    redirect('/meals');
}

function isInvalidText(meal) {
    for (const key in meal) {
        if (meal.hasOwnProperty(key) && key !== 'image') {
            if (!meal[key] || meal[key].trim() === ''|| isEmailAndImageValid(meal)) {
                return true;
            }
        }
    }
    return false;
}

function isEmailAndImageValid(meal) {
    const isEmailInvalid = !meal.creator_email || !meal.creator_email.includes('@');
    const isImageInvalid = !meal.image|| meal.image.size === 0 ;
    return  isEmailInvalid || isImageInvalid;
}