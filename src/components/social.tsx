import { Mail, Newspaper, GitFork } from 'lucide-react'

export function SocialSection() {
    return (
        <section className="flex justify-center items-center">

            <div className="flex items-center gap-10 text-slate-500">
                <a href="https://github.com/querysmith-sys" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex gap-2 items-center">

                    <GitFork className="h-4 w-4" />
                    <span className="text-sm font-medium">GitHub</span>
                </a>
                <a href="https://linkedin.com/in/dipokdutta" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex gap-2 items-center">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0077B5" viewBox="0 0 24 24" className='h-4 w-4'>
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.766c1.393-2.586 7-2.777 7 2.472v6.762z" />
                    </svg>
                    <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a href="https://x.com/dsmith_sys" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors flex gap-2 items-center">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 16 16" className='h-4 w-4'>
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                    <span className="text-sm font-medium">Twitter</span>
                </a>
                <a href="mailto:dipokdutta8099@gmail.com" className="hover:text-red-400 transition-colors flex gap-2 items-center">

                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">Email</span>
                </a>
                <a href="/blog" className="hover:text-red-400 transition-colors flex gap-2 items-center">

                    <Newspaper className="h-4 w-4" />
                    <span className="text-sm font-medium">blogs</span>
                </a>
            </div>
        </section>
    )
}