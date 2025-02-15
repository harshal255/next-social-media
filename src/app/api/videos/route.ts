import dbConnect from "@/lib/db";
import { authOptions } from "@/lib/next-auth-options";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        await dbConnect();
        //In Mongoose, the .lean() method is used to improve query performance by returning plain JavaScript objects instead of Mongoose documents. This makes queries faster because it skips the overhead of Mongoose document features like getters, setters, and change tracking.
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 })
        }
        return NextResponse.json(videos, { status: 200 })
    } catch (error) {
        console.log({ error,route:"get videos" });
        return NextResponse.json({ error: "Failed to fetch Videos" }, { status: 200 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "UnAuthorized" }, { status: 401 });
        }
        await dbConnect();
        const body: IVideo = await request.json();
        if (!body.title || !body.videoUrl || !body.thumbnailUrl || !body.description) {
            return NextResponse.json({ error: "Missing Required Fields" }, { status: 400 });
        }

        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation ?? 100
            }
        }

        const newVideo = await Video.create(videoData);
        return NextResponse.json({ newVideo }, { status: 200 })

    } catch (error) {
        console.log({ error,route:"post videos" });
        return NextResponse.json({ error: "Failed to create a video" }, { status: 400 })
    }
}
