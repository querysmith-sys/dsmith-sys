import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import { SocialSection } from '@/components/social'

export function Home() {
    return (
        <>
            <div className="max-w-2xl mx-auto py-20 md:py-32 space-y-16">

                <section className="flex items-center gap-6 border p-6 rounded-xl bg-slate-900 text-white font-mono">

                    <Avatar className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 overflow-hidden rounded-full border-2 border-slate-700">
                        <AvatarImage src="/dsmith-sys/profile.jpg" className="object-cover w-full h-full" alt="Profile" />
                        <AvatarFallback className="bg-slate-800 text-xl">CN</AvatarFallback>
                    </Avatar>


                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Yahallo! I am Dipok</h1>
                        <p className="text-slate-400 text-sm sm:text-base mt-1">Welcome to my internet home.</p>
                    </div>
                </section>

                <SocialSection />

                <section className="w-full flex justify-center my-6">
                    <div className="w-full max-w-2xl px-4">
                        <img
                            src="/dsmith-sys/banner2.jpg"
                            alt="Hello World banner"
                            className="w-full h-32 object-cover rounded-xl opacity-85"
                        />
                    </div>
                </section>


                <section className="border border-slate-800 p-6 rounded-xl bg-slate-900/30 space-y-4 mt-4">
                    <h2 className="text-lg font-semibold text-slate-200 tracking-tight">About Me</h2>

                    <div className="text-slate-400 text-sm sm:text-base leading-relaxed space-y-3">
                        <p>
                            I am <span className="text-white">Dipok</span>, a 19-year-old Computer Science student from India.
                            I'm deeply fascinated by the architectural design of complex systems, including applied AI,
                            and actively contributing to Open Source Software (OSS).
                        </p>
                        <p>
                            When I'm not staring at a terminal, you can usually find me watching anime or failing to
                            win games of chess (not that I'm any good at it, but it's the effort that counts! &#x1F605;).
                        </p>
                        <p>
                            Also, if you want to check my <a href="https://github.com/querysmith-sys" className='text-blue-500'>projects</a>, check it out in github pins!
                            and check out the <a href="/blog" className='text-blue-500'>blog</a> to see what's cooking.
                        </p>
                    </div>
                </section>

            </div>
        </>
    )
}