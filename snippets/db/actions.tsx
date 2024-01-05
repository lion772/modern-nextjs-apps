'use server';

import {db} from "@/db/index";
import {redirect} from "next/navigation";

interface SnippetArgs {
    title: string,
    code: string,
    [key: string]: string;
};

export async function createSnippet(prevState: any, formData: FormData) {
    console.log(formData)

    const snippet = {
        title: formData.get('title') as string,
        code: formData.get('code') as string,
    }

    if (isInvalidText(snippet)) {
        return {
            message: 'Invalid input.'
        };
    }

    const newSnippet = await db.snippet.create({
        data: {
            title: snippet.title,
            code: snippet.code
        }
    })

    console.log(newSnippet);
    redirect('/');
}


export async function getSnippets() {
    const snippets = await db.snippet.findMany();
    return snippets;
}

export async function getSnippet(snippetId: number) {
    const snippet = await db.snippet.findFirst({
            where: {
                id: snippetId
            }
        });
    return snippet;
}

function isInvalidText(snippet: SnippetArgs) {
    for (const key in snippet) {
        if (snippet.hasOwnProperty(key) && snippet) {
            if (!snippet[key] || snippet[key].trim() === '') {
                return true;
            }
        }
    }
    return false;
}