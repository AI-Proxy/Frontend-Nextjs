"use client";
// import MyThemeProvider from "@/providers/ThemeProvider";
import UserContextProvider from "@/providers/UserContextProvider";
import { ThemeProvider } from "next-themes";

const Provider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        // <MyThemeProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <UserContextProvider>{children}</UserContextProvider>
        </ThemeProvider>
        // </MyThemeProvider>
    );
};

export default Provider;
