'use server';

import {saveMeal} from "@/lib/meals";
import {redirect} from "next/navigation";

export default async function shareMeal(formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instruction: formData.get('instruction'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }

    if (isInvalidText(meal)) {
        return;
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
    return !meal.email.includes('@') || meal.image.size === 0;
}