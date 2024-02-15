export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="">
            <span>layout code</span>
            {children}
        </div>
    );
}
