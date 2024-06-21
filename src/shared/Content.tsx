import NavBar from "@/shared/NavBar";
import {useState} from "react";

export default function Content({children}: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="flex flex-col min-h-screen ">
            <NavBar switchIsMenuOpen={() => setIsMenuOpen(!isMenuOpen)}/>
            <main className="relative flex flex-col items-center grow">
                {isMenuOpen &&
                    <menu
                        className=" bg-opacity-50 bg-k-black z-50"
                    >
                        qwe
                    </menu>
                }
                {children}
            </main>

        </div>
    );
}
