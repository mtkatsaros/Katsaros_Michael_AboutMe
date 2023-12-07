export function assertIsDefined<T>(val:T){
    if(!val){
        throw Error("Expected 'val' to be defined, but received " + val)
    }
}