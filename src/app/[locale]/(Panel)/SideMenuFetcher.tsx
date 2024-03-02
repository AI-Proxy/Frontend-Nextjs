import SideMenu from "@/components/panel/SideMenu";
import { getChatsList } from "@/fetchers/Chats.fetch";
import React from "react";

const SideMenuFetcher = async () => {
    const chatList_initial = await getChatsList("server");
    return <SideMenu chatListInitial={chatList_initial} />;
};

export default SideMenuFetcher;
