import Link from "next/link";
import { memo } from "react";
import { getPrefix } from "@/lib/i18n";
import { Locale } from "@/i18n.config";

function Blog({ params }: Readonly<{ params: { locale: Locale } }>) {
    const localePrefix = getPrefix(params.locale);
    console.log("blog page");

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl">Blog Page</h1>

            <Link href={`${localePrefix}/blog/1`}>Post 1</Link>
            <Link href={`${localePrefix}/blog/2`}>Post 2</Link>

            <Link className="mt-2" href={`${localePrefix}/`}>
                Go Back
            </Link>
        </div>
    );
}

export default Blog;
