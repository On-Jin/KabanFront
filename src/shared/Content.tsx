import NavBar from "@/shared/NavBar";

export default function Content({children}: { children: React.ReactNode }) {
    return (
        <>
            <NavBar/>
            <main>{children}</main>
        </>
    );
}