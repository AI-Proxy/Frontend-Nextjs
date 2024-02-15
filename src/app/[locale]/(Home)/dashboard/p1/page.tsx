import Link from "next/link";

const Post = () => {
    return (
        <>
            <h1 className="text-3xl">Post 1</h1>
            <Link className="mt-2" href="/dashboard/p2">
                Post 2
            </Link>
            <Link className="mt-2" href="/dashboard/p3">
                Post 3
            </Link>
        </>
    );
};

export default Post;
