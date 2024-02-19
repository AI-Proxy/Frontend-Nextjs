"use client";
import { useReducer, createContext, Dispatch } from "react";

type User = { avatar: string; name: string; family: string; email: string };
type actionType = { type: "setUser"; user: User };

const userInital: User = {
    avatar: "",
    name: "kasra",
    family: "keshoo",
    email: "test@gmail.com",
};
const contextInitalValue: { value: User; dispatch: Dispatch<actionType> } = { value: userInital, dispatch: () => {} };
export const userContext = createContext(contextInitalValue);

const reducer = (state: User, action: actionType) => {
    let newState: User = state;
    switch (action.type) {
        case "setUser":
            newState = action.user;
            break;
    }
    return newState;
};

const UserContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [user, dispatch] = useReducer(reducer, userInital);
    return <userContext.Provider value={{ value: user, dispatch }}>{children}</userContext.Provider>;
};

export default UserContextProvider;
