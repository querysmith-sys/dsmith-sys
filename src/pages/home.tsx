import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import { Mail, Newspaper, GitFork } from 'lucide-react'

export function Home() {
    return (
        <>
            <div className="max-w-2xl mx-auto py-20 md:py-32 space-y-16 ">

                <section className="flex items-center gap-6 border p-6 rounded-xl bg-slate-900 text-white">

                    <Avatar className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 overflow-hidden rounded-full border-2 border-slate-700">
                        <AvatarImage src="/profile.jpg" className="object-cover w-full h-full" alt="Profile" />
                        <AvatarFallback className="bg-slate-800 text-xl">CN</AvatarFallback>
                    </Avatar>


                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Yahallo! I am Dipok</h1>
                        <p className="text-slate-400 text-sm sm:text-base mt-1">Welcome to my internet home.</p>
                    </div>
                </section>


                <section className="flex justify-center items-center">

                    <div className="flex items-center gap-10 text-slate-500">
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex gap-2 items-center">

                            <GitFork className="h-4 w-4" />
                            <span className="text-sm font-medium">GitHub</span>
                        </a>
                        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex gap-2 items-center">

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0077B5" viewBox="0 0 24 24" className='h-4 w-4'>
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.766c1.393-2.586 7-2.777 7 2.472v6.762z" />
                            </svg>
                            <span className="text-sm font-medium">LinkedIn</span>
                        </a>
                        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors flex gap-2 items-center">

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 16 16" className='h-4 w-4'>
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                            </svg>
                            <span className="text-sm font-medium">Twitter</span>
                        </a>
                        <a href="mailto:yourgmail@gmail.com" className="hover:text-red-400 transition-colors flex gap-2 items-center">

                            <Mail className="h-4 w-4" />
                            <span className="text-sm font-medium">Email</span>
                        </a>
                        <a href="mailto:yourgmail@gmail.com" className="hover:text-red-400 transition-colors flex gap-2 items-center">

                            <Newspaper className="h-4 w-4" />
                            <span className="text-sm font-medium">blogs</span>
                        </a>
                    </div>
                </section>


                <section className="border border-slate-800 p-6 rounded-xl bg-slate-900/30 space-y-4 mt-4">
                    <h2 className="text-lg font-semibold text-slate-200 tracking-tight">About Me</h2>

                    <div className="text-slate-400 text-sm sm:text-base leading-relaxed space-y-3">
                        <p>
                            I am <span className="text-white font-medium">Dipok</span>, a 19-year-old Computer Science student from India.
                            I'm deeply fascinated by the architectural design of complex systems, including applied AI,
                            and actively contributing to Open Source Software (OSS).
                        </p>
                        <p>
                            When I'm not staring at a terminal, you can usually find me watching anime or failing to
                            win games of chess (not that I'm any good at it, but it's the effort that counts! &#x1F605;).
                        </p>
                        <p>
                            Also, if you want to check my <a href="https://github.com/querysmith-sys" className='text-blue-500'>projects</a>, check it out in github pins!
                        </p>
                    </div>
                </section>

            </div>
        </>
    )
}