import { Button } from "@/components/ui/Button";
import { Locale } from "@/i18n.config";
import { getPrefix, getTranslations } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const Home = async ({ params }: Readonly<{ params: { locale: Locale } }>) => {
    const localePrefix = getPrefix(params.locale);
    const t = await getTranslations(params.locale);

    return (
        <>
            <h1 className="text-3xl">Hi</h1>
            <Image className="relative dark:invert" src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
            <Link href={`${localePrefix}/blog`}>
                {/* <Button>blog</Button> */}
                {/* <Button>{$t("blog")}</Button> */}
                <Button>{t("blog")}</Button>
            </Link>
            <Link href={`${localePrefix}/dashboard`}>
                <Button>Dashboard</Button>
            </Link>
            <Link href={`${localePrefix}/login`}>
                <Button>Login</Button>
            </Link>
            <Link href={`${localePrefix}/panel`}>
                <Button>Panel</Button>
            </Link>
        </>
    );
};

export default Home;
