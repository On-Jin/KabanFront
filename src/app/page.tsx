import SwitchTheme from "@/components/switch-theme";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center dark:bg-zinc-900 dark:text-white">
            <SwitchTheme/>
        </main>
    );
}
