"use client";
import { memo, useContext, useEffect, useState } from "react";
// import { themeContext } from "@/providers/ThemeProvider";
import { TbSun, TbMoonFilled } from "react-icons/tb";
import { useTheme } from "next-themes";
import { Button } from "./ui/Button";

const SwitchThemeButton = () => {
    // const theme = useContext(themeContext);
    // return <button onClick={() => theme.dispatch({ type: "toggle-theme" })}>Switch Theme To {theme.class === "dark" ? "Light" : "Dark"}</button>;

    const { setTheme, resolvedTheme } = useTheme();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} variant="outline" size="icon" suppressHydrationWarning>
            {isClient && resolvedTheme === "dark" ? (
                <TbSun size="1.25rem" suppressHydrationWarning />
            ) : (
                <TbMoonFilled size="1.25rem" suppressHydrationWarning />
            )}
        </Button>
    );
};

export default memo(SwitchThemeButton);
