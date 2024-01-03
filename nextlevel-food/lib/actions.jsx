'use server';

import {saveMeal} from "@/lib/meals";
import {redirect} from "next/navigation";

export default async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instruction: formData.get('instruction'),
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
    redirect('/meals');
}

function isInvalidText(meal) {
    for (const key in meal) {
        if (meal.hasOwnProperty(key)) {
            if (!meal[key] || meal[key].trim() === '' || isEmailAndImageValid(meal)) {
                return true;
            }
        }
    }
    return false;
}

function isEmailAndImageValid(meal) {
    const isEmailInvalid = !meal.email || !meal.email.includes('@');
    const isImageInvalid = !meal.image|| meal.image.size === 0 ;
    return  isEmailInvalid || isImageInvalid;
}