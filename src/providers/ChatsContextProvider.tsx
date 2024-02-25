"use client";
import { ChatList } from "@/lib/fetch";
import { useReducer, createContext, Dispatch, useMemo } from "react";

type actionType = { type: "setInitalChats" | "addChat"; chatList: ChatList };

const contextInitalValue: { value: ChatList; dispatch: Dispatch<actionType> } = { value: [], dispatch: () => {} };
export const ChatsContext = createContext(contextInitalValue);

const reducer = (state: ChatList, action: actionType) => {
    let newState: ChatList = state;
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
