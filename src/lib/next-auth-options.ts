import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    //docs link 🚀📄🔗: https://next-auth.js.org/providers/credentials
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, email, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }
                try {
                    // Add logic here to look up the user from the credentials supplied
                    await dbConnect();
                    const user = await User.findOne({ email: credentials?.email });

                    if (!user) {
                        throw new Error("No User Found");
                    }

                    const isVaid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )

                    if (!isVaid) {
                        throw new Error("Invalid Password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email
                    }

                } catch (error) {
                    throw error;
                }
            }
        })
    ],
    //docs link 🚀📄🔗: https://next-auth.js.org/configuration/callbacks
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        },
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    //docs link 🚀📄🔗 : https://next-auth.js.org/configuration/options
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET
}