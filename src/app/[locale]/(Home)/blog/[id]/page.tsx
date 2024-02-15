import { Metadata } from "next";
import Link from "next/link";
import { memo } from "react";

type props = {
    params: { id: string };
};

export const generateMetadata = ({ params }: props): Metadata => {
    return {
        title: `post ${params.id}`,
    };
};

function Page({ params }: props) {
    return (
        <>
            <h1 className="text-3xl">Post {params.id}</h1>
            <Link className="mt-2" href="/blog">
                Go Back
            </Link>
        </>
    );
}

export default memo(Page);
