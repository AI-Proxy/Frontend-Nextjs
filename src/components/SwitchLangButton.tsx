"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n, type Locale } from "@/i18n.config";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function LocaleSwitcher({ currentLang }: Readonly<{ currentLang: Locale }>) {
    const pathName = usePathname();
    const locales: string[] = [...i18n.locales];

    const redirectedPathName = (locale: Locale) => {
        if (!pathName) return "/";

        const segments = pathName.split("/");
        const lang = locale === i18n.defaultLocale ? "" : locale;
        const localeIsInUrl = locales.includes(segments[1]);

        if (localeIsInUrl) segments[1] = lang;
        else segments[1] = lang ? `${lang}/${segments[1]}` : segments[1];

        return segments.join("/").replaceAll("//", "/");
    };

    return (
        <Card>
            {i18n.locales.map((locale, i) => (
                <Button className="" key={i} variant={locale === currentLang ? "default" : "ghost"} size="sm" asChild>
                    <Link href={redirectedPathName(locale)}>{locale}</Link>
                </Button>
            ))}
        </Card>
    );
}
