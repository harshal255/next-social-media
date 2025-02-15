"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void;
    onProgress: (progress: number) => void;
    fileType?: "image" | "video";
}

export default function FileUpload({
    onSuccess, onProgress, fileType = "image"
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const onError = (err: { message: string }) => {
        console.log("Error", err);
        setError(err.message);
        setUploading(false);
    };

    const handleSuccess = (res: IKUploadResponse) => {
        console.log("Success", res);
        setUploading(false);
        setError(null);
        onSuccess(res);
    };

    const handleStartUpload = () => {
        setUploading(true);
        setError(null);
    };

    const handleProgressUpload = (evt: ProgressEvent) => {
        if (evt.lengthComputable && onProgress) {
            const percentageComplete = (evt.loaded / evt.total) * 100;
            onProgress(Math.round(percentageComplete));
        }
        console.log("Start", evt);
    };

    //this function return boolean value 
    const validateFile = (file: File) => {
        if (fileType === 'video') {
            if (!file.type.startsWith("video/")) {
                setError("Please Upload a new Video File");
                return false;
            }
            //100mb
            if (file.size > 100 * 1024 * 1024) {
                setError("Video Must be leas than 100MB");
                return false;
            }
        } else {
            const validTypes = ['image/jpeg', 'image/webp', 'image/png']
            if (!validTypes.includes(file.type)) {
                setError("Please upload a valid file (JPEG,PNG,webp");
                return false;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError("Image Must be less than 5MB");
                return false;
            }
        }
        return true;
    }

    return (
        <>
            <IKUpload
                fileName={fileType === "video" ? "video" : "image"}
                onError={onError}
                onSuccess={handleSuccess}
                onUploadStart={handleStartUpload}
                onUploadProgress={handleProgressUpload}
                accept={fileType === "video" ? "video/*" : "image/*"}
                className="file-input file-input-bordered w-full"
                validateFile={validateFile}
                useUniqueFileName={true}
                folder={fileType === "video" ? "/videos" : "/images"}
            />
            {
                uploading && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                        <Loader2 className="animate-spin w-4 h-4" />
                        <span>Uploading...</span>
                    </div>
                )
            }
            {error && (
                <div className="text-sm text-red-600">{error}</div>
            )}
        </>
    );
}
