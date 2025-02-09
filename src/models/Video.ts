import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENTIONS = {
    width: 1080,
    height: 1920
}

export interface IVideo {
    _id?: mongoose.Types.ObjectId,
    title: string,
    description: string,
    videoUrl: string,
    thumbnailUrl: string,
    controls?: boolean,
    transformation?: {
        height: number,
        width: number,
        quality?: number
    },
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
};

const videoSchema = new Schema<IVideo>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
        height: { type: Number, default: VIDEO_DIMENTIONS.height },
        width: { type: Number, default: VIDEO_DIMENTIONS.width },
        quality: { type: Number, min: 1, max: 100 }
    },
    deletedAt: { type: Date, default: null }
}, {
    timestamps: true
})

//first models?.User define that nextjs have various edges branches so if already exist then use directly it
const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;