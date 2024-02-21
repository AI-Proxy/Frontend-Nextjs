import { create } from "zustand";

interface User {
    avatar: string;
    name: string;
    family: string;
    email: string;
    setName: (name: string) => void;
}

export const useUserStore = create<User>((set) => {
    return {
        avatar: "",
        name: "kasra",
        family: "keshoo",
        email: "test@gmail.com",
        setName: (name) => {
            return set((state) => ({ ...state, name }));
        },
    };
});
