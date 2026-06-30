import matter from 'gray-matter'

type markdownMetaData = {
    title: string,
    date: string,
    slug: string
}

export function MarkdownParser(markdownContent: any, fileslug: string): markdownMetaData {
    const { data } = matter(markdownContent);
    return {
        title: data.title,
        date: data.date,
        slug: data.slug || fileslug
    }
}