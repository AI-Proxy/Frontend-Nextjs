"use client";
import { memo } from "react";
import SwitchThemeButton from "@/components/SwitchThemeButton";
import SwitchLangButton from "@/components/SwitchLangButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Locale } from "@/i18n.config";
import { usePathname } from "next/navigation";

const Header = ({ currentLang }: { currentLang: Locale }) => {
    const pathname = `${usePathname()}/`;

    return (
        <header className="flex items-center justify-between w-full p-3 py-2.5 ps-11 md:ps-4 shrink-0">
            {pathname?.includes("/panel/chat/") ? (
                <Select defaultValue="gpt-4">
                    <SelectTrigger className="w-full max-w-44 bg-secondary h-12">
                        <SelectValue placeholder="AI Model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gpt-3.5">
                            <div className="flex flex-wrap items-center gap-2 py-1 px-2">
                                <span className="w-5 h-5 rounded-full bg-emerald-300"></span>
                                <b className="text-base">GPT-3.5</b>
                            </div>
                        </SelectItem>
                        <SelectItem value="gpt-4">
                            <div className="flex flex-wrap items-center gap-2 py-1 px-2">
                                <span className="w-5 h-5 rounded-full bg-violet-400"></span>
                                <b className="text-base">GPT-4</b>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            ) : (
                <div></div>
            )}
            <div className="flex items-center gap-2 mt-auto" dir="ltr">
                <SwitchLangButton currentLang={currentLang} />
                <SwitchThemeButton />
            </div>
        </header>
    );
};

export default memo(Header);
