import { API_URL } from "./config";

export type TReview = {
    user: string;
    title: string;
    description: string;
    _id: string;
}

export async function createReview(user:string, title:string, description:string){
    const response = await fetch(`${API_URL}/reviews/write`, {
        method: "POST",
        body: JSON.stringify({
            user,
            title,
            description,
        }),
        headers: {
            "Content-Type": "application/json"
        },
    })

    return response.json()
}

export async function getReviews(): Promise<TReview[]>{
    const response = await fetch(`${API_URL}/reviews`)
    return response.json()
}