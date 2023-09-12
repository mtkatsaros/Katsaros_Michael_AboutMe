/**
 * @author Michael Katsaros
 * @description extends fetchData in order to handle errors 
 * in a more coherent fashion
 */
import { ConflictError, UnauthorizedError } from "../errors/http_errors"

export const API_URL = "http://localhost:50000"

export async function fetchData(input: RequestInfo, init?: RequestInit){
    const response = await fetch(input, init)
    if(response.ok){
        return response
    }
    else{
        const errorBody = await response.json()
        const errorMessage = errorBody.error

        if(response.status === 401){
            throw new UnauthorizedError(errorMessage)
        }
        else if (response.status === 409){
            throw new ConflictError(errorMessage)
        }
        throw Error(errorMessage)   
    }
}