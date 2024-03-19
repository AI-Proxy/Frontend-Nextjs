"use client";
import { Chat } from "@/fetchers/Chats.fetch";
import { useReducer, createContext, Dispatch } from "react";

type actionType = { type: "setInitalChats" | "loadMoreChats" | "addNewChat"; chatList: Chat[] };

const contextInitalValue: { value: Chat[]; dispatch: Dispatch<actionType> } = { value: [], dispatch: () => {} };
export const ChatsContext = createContext(contextInitalValue);

const reducer = (state: Chat[], action: actionType) => {
    let newState: Chat[] = state;
    switch (action.type) {
        case "setInitalChats":
            newState = action.chatList;
            break;
        case "loadMoreChats":
            for (const chat of action.chatList) {
                const chatIndex = chatGroupObjectFinder(state, chat.date);
                if (chatIndex) state[Number(chatIndex)].list.push(...chat.list);
                else state.push({ list: chat.list, date: chat.date });
            }
            newState = [...state];
            break;
        case "addNewChat":
            if (state[0]?.date === "Today") state[0].list.unshift(action.chatList[0].list[0]);
            else state.unshift({ date: "Today", list: action.chatList[0].list });
            newState = [...state];
            break;
    }
    return newState;
};

const chatGroupObjectFinder = (chatList: Chat[], dateToFind: string): string => {
    for (const index in chatList) {
        const chat = chatList[index];
        if (chat.date === dateToFind) return index;
    }
    return "";
};

const ChatsContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [chats, dispatch] = useReducer(reducer, []);
    return <ChatsContext.Provider value={{ value: chats, dispatch }}>{children}</ChatsContext.Provider>;
};

export default ChatsContextProvider;
