'use server';

import {saveMeal} from "@/lib/meals";

export default async function shareMeal(formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instruction: formData.get('instruction'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }

    const res = await saveMeal(meal);
}