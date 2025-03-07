'use client';
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'
import { useNotification } from '../context/NotificationProvider';
import { Home, User } from "lucide-react";

const Header = () => {
    const { data: session } = useSession();
    const { setNotification } = useNotification();


    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error: any) {
            throw new Error(error?.message);
        }
    }
    return (
        <div className="navbar bg-base-300 sticky top-0 z-40">
            <div className="container mx-auto">
                <div className="flex-1 px-2 lg:flex-none">
                    <Link
                        href="/"
                        className="btn btn-ghost text-xl gap-2 normal-case font-bold"
                        prefetch={true}
                        onClick={() =>
                            setNotification("Welcome to Next Social Media", "info")
                        }
                    >
                        <Home className="w-5 h-5" />
                        Next Social Media
                    </Link>
                </div>
                <div className="flex flex-1 justify-end px-2">
                    <div className="flex items-stretch gap-2">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle"
                            >
                                <User className="w-5 h-5" />
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
                            >
                                {session ? (
                                    <>
                                        <li className="px-4 py-1">
                                            <span className="text-sm opacity-70">
                                                {session.user?.email}
                                            </span>
                                        </li>
                                        <div className="divider my-1"></div>

                                        <li>
                                            <Link
                                                href="/upload"
                                                className="px-4 py-2 hover:bg-base-200 block w-full"
                                                onClick={() =>
                                                    setNotification("Welcome to Admin Dashboard", "info")
                                                }
                                            >
                                                Video Upload
                                            </Link>
                                        </li>

                                        <li>
                                            <button
                                                onClick={handleSignOut}
                                                className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
                                            >
                                                Sign Out
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link
                                            href="/login"
                                            className="px-4 py-2 hover:bg-base-200 block w-full"
                                            onClick={() =>
                                                setNotification("Please sign in to continue", "info")
                                            }
                                        >
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
