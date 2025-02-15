import { IVideo } from "@/models/Video";

//Omit<T, K> is a utility type that creates a new type by removing one or more keys (K) from an existing type (T).
export type VideoFormData = Omit<IVideo, "_id">;

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    headers?: Record<string, string> //bsically key-value pair like an obj
}

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:3000";

class ApiClient {
    private async centralizedFetch<T>(
        endpoint: string,
        options: FetchOptions = {}): Promise<T> {
        const { method = "GET", body, headers = {} } = options;

        const defaultHeaders = {
            "Content-Type": "application/json", ...headers
        }

        const response = await fetch(`${baseURL}/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined
        });

        if (!response.ok) {
            throw new Error(await response.text())
        }
        return response.json();
    }


    async getVideos() {
        return this.centralizedFetch<IVideo[]>("/videos");
    }

    async getVideoById(id: string) {
        return this.centralizedFetch<IVideo>(`/videos/${id}`);
    }

    async createVideo(videoData: VideoFormData) {
        return this.centralizedFetch("/videos", {
            method: "POST",
            body: videoData
        })
    }
}

export const apiClient = new ApiClient();