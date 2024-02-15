"use client";
import { userContext } from "@/providers/UserContextProvider";
import { useContext } from "react";

const Header = () => {
    const user = useContext(userContext);
    return (
        <div>
            <span>Header</span>
            <span>{user.value.name}</span>
        </div>
    );
};

export default Header;
