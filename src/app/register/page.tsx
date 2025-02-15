'use client';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

const page = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setEmail("Your Password does not match");
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })

            })

            const data = res.json();
            if (!res.ok) {
                setError("Registration failed");
            }
            router.push("/login");

        } catch (error) {
            setError("Registration failed");
        }
    }

    return (
        <div>
            Register
        </div>
    )
}

export default page
