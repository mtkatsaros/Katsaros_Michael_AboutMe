import { User } from "../models/user";
import { API_URL, fetchData } from "./fetch_api";

export async function getLoggedInUser():Promise<User>{
    const response = await fetchData(`${API_URL}/user`, {method: 'GET'})
    return response.json()
}

export interface SignUpCredentials{
    username: string,
    email: string,
    password: string,
}

export async function createAccount(credentials: SignUpCredentials): Promise<User>{
    const response = await fetchData(`${API_URL}/user/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export interface LogInCredentials{
    email: string,
    password: string,
}

export async function login(credentials: LogInCredentials): Promise<User>{
    const response = await fetchData(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export async function logout(){
    await fetchData(`${API_URL}/user/logout`, {method: 'POST'})
}