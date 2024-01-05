'use client';

import { useFormState } from 'react-dom';
import {createSnippet} from "@/db/actions";

export default function SnippetCreatePage() {
    const [state, formAction] = useFormState(createSnippet, {message: ''});
    return (
        <form action={formAction}>
            <h3>Create a Snippet</h3>
            <div className='flex flex-col gap-4 mt-10'>
                <div className='flex gap-4'>
                    <label className='w-12' htmlFor="title">Title</label>
                    <input name='title'
                           className='border rounded p-2 w-full'
                           id='title'
                           type="text"/>
                </div>
                <div className='flex gap-4'>
                    <label className='w-12' htmlFor="code">Code</label>
                    <textarea name='code'
                           className='border rounded p-2 w-full'
                           id='code'/>
                </div>
                <button type='submit' className='rounded p-2 bg-blue-200'>Create</button>
            </div>
        </form>
    )
}
