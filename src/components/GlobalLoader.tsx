export const GlobalLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
            <div className="flex flex-col items-center gap-6">
                <div className="text-3xl font-bold tracking-tight text-white">
                    DD<span className="text-slate-500">.</span>
                </div>

                <div className="h-px w-32 overflow-hidden bg-slate-800">
                    <div className="h-full w-1/2 animate-[loader_1.2s_ease-in-out_infinite] bg-white" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-slate-500">
                    INITIALIZING
                </span>
            </div>

            <style>{`
                @keyframes loader {
                    0% {
                        transform: translateX(-100%);
                    }
                    50% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(200%);
                    }
                }
            `}</style>
        </div>
    );
};