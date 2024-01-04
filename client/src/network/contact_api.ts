import { API_URL, fetchData } from "./fetch_api";

export interface messageInput{
    name: string,
    email: string,
    message: string, 
}

export async function sendMessage(message: messageInput){
    const response = await fetchData(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message), 
        credentials: 'include'
    })
    return response.json()
}

export async function confirmationMessage(message: messageInput){
    const response = await fetchData(`${API_URL}/contact/confirm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message), 
        credentials: 'include'
    })
    return response.json()
}