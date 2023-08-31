import { API_URL } from "./config";

export type TAccount = {
    user: string;
    email: string;
    password: string;
}

export async function createAccount(user:string, email:string, password:string){
    const response = await fetch(`${API_URL}/create`, {
        method: "POST", 
        body: JSON.stringify({
            user,
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
