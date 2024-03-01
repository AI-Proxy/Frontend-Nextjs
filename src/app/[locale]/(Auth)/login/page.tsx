"use client";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TbLoader } from "react-icons/tb";
import { useToast } from "@/hooks/UseToast";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dancing_Script } from "next/font/google";

const romanesco = Dancing_Script({ weight: "700", subsets: ["latin"] });

const Login = () => {
    const { toast } = useToast();
    const router = useRouter();

    const mobile = useRef("");
    const [step, setStep] = useState(1);
    const [timeLeft, setTimeLeft] = useState(120);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timeLeft) setTimeLeft((t) => Math.max(0, t - 1));
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const login = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        const data = new FormData(event.currentTarget);
        mobile.current = data.get("mobile")?.toString() || "";

        const R = await fetch("/api/v1/auth/login", { method: "POST", body: data });
        const response: any = (await R.json().catch((e) => {})) || {};
        setLoading(false);

        if (R.status >= 400) {
            toast({ title: "Whoops...", description: response.message ?? "Unknow Error", variant: "destructive" });
            return;
        }

        setStep(2);
        setTimeLeft(response.remaining_time ?? 120);
    };

    const verifyPhoneNumber = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        const data = new FormData(event.currentTarget);
        data.append("mobile", mobile.current);

        const R = await fetch("/api/auth/verify-code", { method: "POST", body: data });
        const response: any = (await R.json().catch((e) => {})) || {};

        if (R.status >= 400) {
            setLoading(false);
            toast({ title: "Whoops...", description: response.message.toString() ?? "Unknow Error", variant: "destructive" });
            return;
        }

        router.replace("/panel");
    };

    const resendCode = async () => {
        const data = new FormData();
        data.append("mobile", mobile.current);

        setLoading(true);
        const R = await fetch("/api/v1/auth/login", { method: "POST", body: data });
        const response: any = (await R.json().catch((e) => {})) || {};
        setLoading(false);

        if (R.status >= 400) {
            toast({ title: "Whoops...", description: response.message ?? "Unknow Error", variant: "destructive" });
            return;
        }

        setTimeLeft(response.remaining_time ?? 120);
    };

    const stepOne = (
        <Card className="w-full max-w-96">
            <CardContent className="flex flex-col items-center gap-6 w-full p-8">
                <h1 className="text-3xl font-bold">
                    Welcome To <span className={`${romanesco.className} ms-1`}>AI</span>
                </h1>
                <p className="text-sm opacity-75 -mb-2 text-pretty">Enter your phone number to login or register</p>
                <form className="flex flex-col items-center gap-4 w-full" key="enter" onSubmit={login}>
                    <Input className="py-6" type="text" name="mobile" placeholder="Phone Number" required />
                    <Button className="w-full py-6" type="submit" disabled={loading}>
                        {loading ? <TbLoader className="animate-spin" size="1.25rem" /> : "Continue"}
                    </Button>
                </form>
                <small className="text-xs opacity-50 text-center">
                    By signing up you accept our{" "}
                    <a className="underline" href="/terms-of-service">
                        Terms Of Service
                    </a>{" "}
                    and{" "}
                    <a className="underline" href="/privacy-policy">
                        Privacy Policy
                    </a>
                </small>
            </CardContent>
        </Card>
    );
    const stepTwo = (
        <Card className="w-full max-w-96">
            <CardContent className="flex flex-col items-center gap-6 w-full p-8">
                <h1 className="text-3xl font-bold">Verify Phone Number</h1>
                <p className="text-sm opacity-75 -mb-2 text-pretty">We sent a verification code to your phone number</p>
                <form className="flex flex-col items-center gap-4 w-full" key="verify" onSubmit={verifyPhoneNumber}>
                    <Input className="py-6 appearance-none" type="number" name="otp" placeholder="Verification Code" required />
                    <Button className="w-full py-6" type="submit">
                        {loading ? <TbLoader className="animate-spin" size="1.25rem" /> : "Verify"}
                        Continue
                    </Button>
                    <div className="flex flex-col items-center w-full">
                        <small className="text-muted-foreground">{new Date(timeLeft * 1000).toISOString().substring(14, 19)}</small>
                        <Button className="p-0.5 h-auto" type="button" variant="link" onClick={resendCode} disabled={timeLeft > 0}>
                            Resend
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );

    switch (step) {
        case 1:
            return stepOne;
        case 2:
            return stepTwo;
    }
};

export default Login;
