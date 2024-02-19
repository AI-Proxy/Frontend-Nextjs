"use client";
// import MyThemeProvider from "@/providers/ThemeProvider";
import ChatsContextProvider from "@/providers/ChatsContextProvider";
import UserContextProvider from "@/providers/UserContextProvider";
import { ThemeProvider } from "next-themes";

const Provider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        // <MyThemeProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <UserContextProvider>
                <ChatsContextProvider>{children}</ChatsContextProvider>
            </UserContextProvider>
        </ThemeProvider>
        // </MyThemeProvider>
    );
};

export default Provider;
