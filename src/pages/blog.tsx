import { SocialSection } from "@/components/social"
import { MarkdownParser } from "@/utils/markdown"
import { useEffect, useState } from "react"



type markdownMetaData = {
    title: string,
    date: string,
    slug: string
}

export function Blog() {
    const [metadata, setMetaData] = useState<markdownMetaData[]>([])
    useEffect(() => {
        const markdownFiles = import.meta.glob('../content/posts/*.md', { eager: true, query: 'raw' });

        const markdownMetaData = Object.entries(markdownFiles).map(([filePath, fileContent]) => {
            const filename = filePath.split('/').pop()?.replace('.md', '');
            let extractedRawData = (fileContent as any).default

            if (!filename) {
                console.error(`Could not parse filename from path: ${filePath}`);
                return null;
            }
            return MarkdownParser(extractedRawData, filename)
        })
        const validMetaData = markdownMetaData.filter((item): item is markdownMetaData => item !== null);
        setMetaData(validMetaData)
    }, [])
    return (
        <>
            <div className="max-w-2xl mx-auto h-screen py-8 md:py-12 flex flex-col px-4 tracking-tight overflow-hidden">

                <section className="flex flex-col items-center text-center">
                    <div className="w-full mb-6">
                        <img
                            src="banner3.jpg"
                            alt="Hello World banner"
                            className="w-full h-32 object-cover rounded-xl opacity-90 border border-zinc-800/50 shadow-lg"
                        />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl font-serif">
                        To My Blog
                    </h1>
                </section>

                <section className="flex justify-center border-y border-zinc-800/40 py-3 mt-6">
                    <SocialSection />
                </section>

                <section className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin mt-10">
                    <div className="font-mono text-base leading-relaxed">
                        {metadata.map((data, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-baseline space-y-1 sm:space-y-0 sm:space-x-4 group py-2">
                                <span className="text-zinc-500 shrink-0 select-none antialiased">
                                    {data.date}
                                </span>

                                <span className="hidden sm:inline text-zinc-700 font-bold">:</span>

                                <a
                                    href={`/blog/${data.slug}`}
                                    className="text-zinc-300 hover:text-green-400 transition-colors duration-150 underline-offset-4 group-hover:underline font-medium"
                                >
                                    {data.title}
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}