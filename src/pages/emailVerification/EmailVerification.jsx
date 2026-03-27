import { useEffect, useState } from "react";

export default function EmailVerification({ signupData }) {
    const [firstEmail, setFirstEmail] = useState(true);
    const [cooldown, setCooldown] = useState(0);
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (signupData?.email) {
            setEmail(signupData.email);
        }
    }, [signupData]);

    const handleSend = async () => {
        if (cooldown > 0 || !email) return;

        const res = await fetch("http://localhost:3001/api/users/resend-verification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
            }),
        });

        if (!res.ok) return;

        setFirstEmail(false);
        setCooldown(30);

        const interval = setInterval(() => {
            setCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-stone-100">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-12">
                <h1 className="text-3xl font-[Panchang-Semibold] mb-3 text-center pb-5">
                    Verify your email
                </h1>

                <p className="text-stone-600 text-center font-[Panchang-Regular] pb-5">
                    We are going to send a verification email to <span className="text-black">{email}</span>.
                    Please check your inbox to activate your account.
                </p>

                <button
                    className="mt-2 w-full bg-black text-white py-3 rounded-full font-[Panchang-Regular] border border-black transition-all hover:bg-white hover:text-black hover:border hover:border-black"
                    onClick={handleSend}
                    type="button"
                    disabled={cooldown > 0 || !email}
                >
                    {cooldown > 0
                        ? `Resend in ${cooldown}s`
                        : firstEmail
                            ? "Send verification email"
                            : "Resend verification email"}
                </button>
            </div>
        </div>
    );
}
