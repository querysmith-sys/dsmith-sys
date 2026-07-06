import markdownit from 'markdown-it';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export function BlogContent() {
    const [content, setContent] = useState<string | null>(null);
    const [meta, setMeta] = useState<{ title: string; date: string }>({ title: 'Untitled Post', date: '' });
    const { slug } = useParams();

    useEffect(() => {
        const markdownFiles = import.meta.glob('../content/posts/*.md', { eager: true, query: 'raw' });
        Object.entries(markdownFiles).forEach(([filePath, fileContent]) => {
            if (slug && filePath.includes(slug)) {
                const rawMarkdown = (fileContent as any).default;

                const titleMatch = rawMarkdown.match(/title:\s*["']([^"']+)["']/);
                const dateMatch = rawMarkdown.match(/date:\s*["']([^"']+)["']/);

                setMeta({
                    title: titleMatch ? titleMatch[1] : 'Untitled Post',
                    date: dateMatch ? dateMatch[1] : ''
                });

                const cleanedContent = rawMarkdown.replace(/^---[\s\S]*?---/, '');

                const md = new markdownit({ html: true, linkify: true });
                const htmlContent = md.render(cleanedContent);
                setContent(htmlContent);
            }
        });
    }, [slug]);

    if (!content) return <div className="text-zinc-500 font-mono text-center py-24">Loading post...</div>;

    return (
        <div className="max-w-2xl mx-auto py-12 md:py-20 px-4 tracking-tight min-h-screen flex flex-col justify-between">
            <div>
                <nav className="mb-12">
                    <Link
                        to="/"
                        className="font-mono text-xs text-zinc-500 hover:text-green-400 flex items-center gap-1 transition-colors group"
                    >
                        <span className="inline-block transform group-hover:-translate-x-1 transition-transform">←</span>
                        back to home
                    </Link>
                </nav>

                {/* Styled Post Header Header */}
                <header className="mb-10 pb-6 border-b border-zinc-800/60">
                    {meta.date && (
                        <time className="font-mono text-xs text-zinc-500 block mb-3 antialiased">
                            {meta.date}
                        </time>
                    )}
                    <h1 className="text-3xl font-bold font-serif text-zinc-100 tracking-tight sm:text-4xl leading-tight">
                        {meta.title}
                    </h1>
                </header>


                <article
                    className="prose prose-zinc prose-invert max-w-none
                               prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-base
                               prose-headings:font-serif prose-headings:text-zinc-100 prose-headings:mt-8 prose-headings:mb-4
                               prose-a:text-green-400 prose-a:no-underline hover:prose-a:underline
                               prose-strong:text-zinc-100
                               prose-code:text-green-300 prose-code:bg-zinc-900/40 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>

            <footer className="mt-24 pt-6 border-t border-zinc-900 font-mono text-[10px] text-zinc-600 text-center">
                Built with dsmith-sys. &copy; {new Date().getFullYear()} Dipok Dutta. All rights reserved.
            </footer>
        </div>
    );
}