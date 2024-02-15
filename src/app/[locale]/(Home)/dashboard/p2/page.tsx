import Link from "next/link";

const Post = () => {
    return (
        <>
            <h1 className="text-3xl">Post 2</h1>
            <Link className="mt-2" href="/dashboard/p1">
                Post 1
            </Link>
        </>
    );
};

export default Post;
