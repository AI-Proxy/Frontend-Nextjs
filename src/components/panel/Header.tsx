import { memo } from "react";
import SwitchThemeButton from "@/components/SwitchThemeButton";
import SwitchLangButton from "@/components/SwitchLangButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Locale } from "@/i18n.config";

const Header = ({ currentLang }: { currentLang: Locale }) => {
    return (
        <header className="flex items-center justify-between w-full p-4 py-3.5 ps-11 md:ps-4 shrink-0">
            <Select defaultValue="gpt-4">
                <SelectTrigger className="w-32">
                    <SelectValue placeholder="AI Model" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                </SelectContent>
            </Select>
            <div className="flex items-center gap-2 mt-auto" dir="ltr">
                <SwitchLangButton currentLang={currentLang} />
                <SwitchThemeButton />
            </div>
        </header>
    );
};

export default memo(Header);
