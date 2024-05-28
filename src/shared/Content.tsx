import NavBar from "@/shared/NavBar";

export default function Content({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen ">
            <NavBar/>
            <main className="flex flex-col items-center grow">
                {children}
            </main>
        </div>
    );
}