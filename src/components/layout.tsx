import { Outlet } from 'react-router-dom'


export function Layout() {

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 font-sans antialiased">
            <main className="flex-1 w-full px-4">
                <Outlet />
            </main>
        </div>
    )
}