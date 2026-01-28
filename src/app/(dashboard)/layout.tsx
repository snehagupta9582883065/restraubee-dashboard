import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 overflow-x-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen min-w-0">
                <main className="flex-1 ml-64 p-4 lg:p-8 relative overflow-hidden">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 -z-10" />

                    <div className="max-w-[1600px] mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
