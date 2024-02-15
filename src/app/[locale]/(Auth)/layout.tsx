import "@/app/globals.css";
import type { Metadata } from "next";
import SwitchThemeButton from "@/components/SwitchThemeButton";
import SwitchLangButton from "@/components/SwitchLangButton";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/Toaster";
import Provider from "@/app/provider";
import { getDir } from "@/lib/i18n";
import { Locale } from "@/i18n.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI.Hub | Login",
    description: "",
};

export default function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: { locale: Locale } }>) {
    const dir = getDir(params.locale);

    return (
        <html lang={params.locale} dir={dir}>
            <body className={inter.className}>
                <Provider>
                    <main className="flex flex-col items-center justify-center gap-2 h-screen">
                        <div className="mt-auto"></div>
                        {children}
                        <div className="flex items-center gap-2 mt-auto mb-4" dir="ltr">
                            <SwitchLangButton currentLang={params.locale} />
                            <SwitchThemeButton />
                        </div>
                    </main>
                </Provider>
                <Toaster />
            </body>
        </html>
    );
}
