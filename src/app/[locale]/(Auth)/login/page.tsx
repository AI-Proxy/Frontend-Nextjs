"use client";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { TbLoader } from "react-icons/tb";
import { useToast } from "@/hooks/UseToast";
import { FormEvent, useEffect, useState } from "react";
import { Aclonica, Dancing_Script } from "next/font/google";

const romanesco = Dancing_Script({ weight: "700", subsets: ["latin"] });

const Login = () => {
    const { toast } = useToast();

    const [step, setStep] = useState(1);
    const [timeLeft, setTimeLeft] = useState(120);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timeLeft) setTimeLeft((t) => Math.max(0, t - 1));
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const getPhoneNumber = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Whoops...",
                description: "The verification code has been expired!",
                variant: "destructive",
            });
        }, 5000);

        // const data = new FormData(event.currentTarget);
        // const name = data.get("name");
        // const email = data.get("email");
        // const avatar = data.get("avatar");

        // await axios
        //     .post("/api/some-route", data, {})
        //     .then((res) => {
        //         console.log({ dd: res.data });
        //     })
        //     .catch((e) => {
        //         console.log({ e });
        //     });

        // await fetch("/api/some-route", { method: "POST", body: data }).then(async (res) => {
        //     console.log({ dd: await res.json() });
        // });

        // setStep(2);
        // setTimeLeft(120);
    };

    const verifyPhoneNumber = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // const data = new FormData(event.currentTarget);
        // const name = data.get("name");
        // const email = data.get("email");
        // const avatar = data.get("avatar");

        // await fetch("/api/some-route", { method: "POST", body: data }).then(async (res) => {
        //     console.log({ dd: await res.json() });
        // });

        setStep(1);
    };

    const stepOne = (
        <Card className="w-full max-w-96">
            <CardContent className="flex flex-col items-center gap-6 w-full p-8">
                <h1 className="text-3xl font-bold">
                    Welcome To <span className={`${romanesco.className} ms-1`}>AI</span>
                </h1>
                <p className="text-sm opacity-75 -mb-2 text-pretty">Enter your phone number to login or register</p>
                <form className="flex flex-col items-center gap-4 w-full" name="enter" onSubmit={getPhoneNumber}>
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
                <form className="flex flex-col items-center gap-4 w-full" name="verify" onSubmit={verifyPhoneNumber}>
                    <Input className="py-6 appearance-none" type="number" name="code" placeholder="Verification Code" required />
                    <Button className="w-full py-6" type="submit">
                        {loading ? <TbLoader className="animate-spin" size="1.25rem" /> : "Verify"}
                        Continue
                    </Button>
                    <small className="text-muted-foreground">{new Date(timeLeft * 1000).toISOString().substring(14, 19)}</small>
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
