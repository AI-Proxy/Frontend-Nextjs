"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RefreshToken = () => {
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(async () => {
            await fetch("/api/auth/refresh", { method: "POST" })
                .then((r) => {
                    if (r.status === 401) router.replace("/login");
                })
                .catch((e) => {});
        }, 15 * 60 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <></>;
};

export default RefreshToken;
