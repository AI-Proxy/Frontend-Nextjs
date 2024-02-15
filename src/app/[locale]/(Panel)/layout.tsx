import "@/app/globals.css";
// import "highlight.js/styles/atom-one-dark.min.css";
// import "highlight.js/styles/base16/dracula.min.css";
import "highlight.js/styles/base16/classic-dark.min.css";
import type { Metadata } from "next";
import SwitchThemeButton from "@/components/SwitchThemeButton";
import SwitchLangButton from "@/components/SwitchLangButton";
import { Inter, Vazirmatn } from "next/font/google";
import { Toaster } from "@/components/ui/Toaster";
import Provider from "@/app/provider";
import { getDir } from "@/lib/i18n";
import { Locale } from "@/i18n.config";
import SideMenu from "@/components/panel/SideMenu";
import Header from "@/components/panel/Header";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const vazirmatn = Vazirmatn({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI.Hub | Login",
    description: "",
};

export default function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: { locale: Locale } }>) {
    const dir = getDir(params.locale);

    return (
        <html lang={params.locale} dir={dir}>
            <body>
                <Provider>
                    <div className="flex w-full flex-grow">
                        <SideMenu />
                        <main className="flex flex-col items-center justify-center max-h-full h-screen flex-grow">
                            <Header currentLang={params.locale} />
                            {children}
                        </main>
                    </div>
                </Provider>
                <Toaster />
            </body>
        </html>
    );
}
