import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import { Toaster } from "@/components/ui/Toaster";
import Provider from "@/app/provider";
import { getDir } from "@/lib/i18n";
import { Locale } from "@/i18n.config";
import SideMenu from "@/components/panel/SideMenu";
import Header from "@/components/panel/Header";
import SideMenuFetcher from "./SideMenuFetcher";
import { Suspense } from "react";

// const inter = Inter({ subsets: ["latin"] });
// const vazirmatn = Vazirmatn({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI.Hub | Panel",
    description: "",
};

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: { locale: Locale } }>) {
    const dir = getDir(params.locale);

    return (
        <html lang={params.locale} dir={dir}>
            <body>
                <Provider>
                    <div className="flex w-full h-full overflow-clip">
                        <Suspense fallback="loading...">
                            <SideMenuFetcher />
                        </Suspense>
                        <main className="flex flex-col h-[100svh] max-h-full overflow-clip grow">
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
