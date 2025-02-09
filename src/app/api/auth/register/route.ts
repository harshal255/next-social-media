import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {

    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "email and password are required" }, { status: 400 })
        }

        await dbConnect();
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: "email already registred" }, { status: 400 })
        }

        await User.create({ email, password });

        return NextResponse.json({ message: "user registered successfully" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "failed to register user" }, { status: 500 })
    }

}
