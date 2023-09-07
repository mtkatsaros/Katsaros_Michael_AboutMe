import { API_URL } from "./config";

export type TUser = {
    username: string;
    email: string;
    password: string;
}

export async function createAccount(username:string, email:string, password:string){
    const response = await fetch(`${API_URL}/create`, {
        method: "POST", 
        body: JSON.stringify({
            username,
            email,
            password,
        }),
        headers:{
            "Content-Type": "application/json"
        },
    })
    return response.json()
}

export async function login(email:string, password:string){
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
        headers:{
            "Content-Type": "application/json"
        },
    })
    return response.json()
}

