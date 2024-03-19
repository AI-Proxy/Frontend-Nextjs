import SideMenu from "@/components/panel/SideMenu";
import { Chat, getChatsList } from "@/fetchers/Chats.fetch";

const SideMenuFetcher = async () => {
    let chatList_initial: Chat[] = [];
    await getChatsList("server")
        .then((c) => (chatList_initial = c))
        .catch((e) => console.log({ e }));

    return <SideMenu chatListInitial={chatList_initial} />;
};

export default SideMenuFetcher;
