export default function Layout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full grow flex flex-col">
            {children}
        </div>
    );
}
