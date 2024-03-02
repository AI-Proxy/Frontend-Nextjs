"use client";
import { Chat } from "@/fetchers/Chats.fetch";
import { useReducer, createContext, Dispatch } from "react";

type actionType = { type: "setInitalChats" | "addChat"; chatList: Chat[] };

const contextInitalValue: { value: Chat[]; dispatch: Dispatch<actionType> } = { value: [], dispatch: () => {} };
export const ChatsContext = createContext(contextInitalValue);

const reducer = (state: Chat[], action: actionType) => {
    let newState: Chat[] = state;
    switch (action.type) {
        case "setInitalChats":
            newState = action.chatList;
            break;
        case "addChat":
            state[0].list.unshift(action.chatList[0].list[0]);
            newState = [...state];
            break;
    }
    return newState;
};

const ChatsContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [chats, dispatch] = useReducer(reducer, []);
    return <ChatsContext.Provider value={{ value: chats, dispatch }}>{children}</ChatsContext.Provider>;
};

export default ChatsContextProvider;
