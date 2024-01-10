import {getSnippet} from "@/db/actions";
import {notFound} from "next/navigation";

interface SnippetDetailPageProps {
    params: {
        snippetid: string;
    };
}

export default async function SnippetDetailPage({ params }: SnippetDetailPageProps) {
    const { snippetid } = params;
    const snippet = await getSnippet(+snippetid);

    if (!snippet) {
        notFound();
    }

    return (
        <>
            <div className="p-8">
                <div className="flex p-8 gap-12 mx-auto max-w-screen-lg">
                    <div className="flex flex-col justify-center max-w-2xl">
                        <h1 className="text-4xl uppercase font-extrabold text-shadow">
                            {snippet?.title}
                        </h1>
                        <p className="text-lg text-creator font-italic mt-5">
                            <span
                                className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
                            >
                                Below you find the snippet code:
                            </span>
                        </p>
                    </div>
                </div>

                <div className="text-lg leading-6 bg-gray-700 text-gray-100 rounded-md shadow-md p-8 mx-auto my-8 max-w-screen-md">
                    <p>{snippet?.code}</p>
                </div>
            </div>
        </>
    );
}