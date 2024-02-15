import Link from "next/link";

export default function Dashboard() {
    return (
        <>
            <h1 className="text-3xl">Dashboard</h1>
            <div className="flex flex-col gap-1">
                <Link href="/dashboard/p1">p1</Link>
                <Link href="/dashboard/p2">p2</Link>
            </div>
        </>
    );
}
