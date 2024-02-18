"use client";
import { createContext, useReducer, Dispatch, useEffect } from "react";

type themeType = "light" | "dark";
type actionType = { type: "toggle-theme" | "set-theme"; theme?: themeType };

const themeInitalValue: themeType = "light";
const contextInitalValue: { class: themeType; dispatch: Dispatch<actionType> } = { class: themeInitalValue, dispatch: () => {} };
export const themeContext = createContext(contextInitalValue);

const reducer = (state: themeType, action: actionType): themeType => {
    let newState: themeType = state;
    switch (action.type) {
        case "toggle-theme":
            newState = state === "dark" ? "light" : "dark";
            break;
        case "set-theme":
            newState = action.theme || state;
            break;
    }
    changeTheme(state, newState);
    return newState;
};

const changeTheme = (oldTheme: themeType, newTheme: themeType) => {
    const htmlTag = document.getElementsByTagName("html")[0];
    localStorage.setItem("theme", newTheme);
    htmlTag.classList.add(newTheme);
    htmlTag.classList.remove(oldTheme);
};

const ThemeProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    // btw becuse we use classes and html attrebute to set the theme we dont need a context to share with whole app
    const [theme, dispatch] = useReducer(reducer, themeInitalValue);

    // #BUG the bug with this theme provider is on first page load it will not load data from localstorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) dispatch({ type: "set-theme", theme: savedTheme === "dark" ? "dark" : "light" });
    }, []);

    return <themeContext.Provider value={{ class: theme, dispatch }}>{children}</themeContext.Provider>;
};

export default ThemeProvider;
