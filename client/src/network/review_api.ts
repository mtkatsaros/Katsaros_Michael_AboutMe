import { Review } from "../models/review";
import { API_URL, fetchData } from "./fetch_api";

const route = `endorsements`

export async function fetchReviews(): Promise<Review[]> {
    const response = await fetchData(`${API_URL}/${route}`, {method: "GET", credentials: 'include'})
    return response.json()
}

export interface ReviewInput {
    user: string,
    title: string,
    description: string,
    uid: string,
}

export async function writeReview(review: ReviewInput): Promise<Review>{
    const response = await fetchData(`${API_URL}/${route}/edit/write`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review), 
        credentials: 'include'
    })
    return response.json()
}

export async function updateReview(reviewId: string, review: ReviewInput): Promise<Review>{
    const response = await fetchData(`${API_URL}/${route}/edit/${reviewId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review), 
        credentials: 'include'
    })
    return response.json()
}

export async function deleteReview(reviewId: string){
    await fetchData(`${API_URL}/${route}/edit/${reviewId}/delete`, {method: "DELETE", 
    credentials: 'include'})
}