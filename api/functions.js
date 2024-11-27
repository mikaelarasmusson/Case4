"use strict";

export async function getFile(file) {
    return JSON.parse(await Deno.readTextFile(file));
}

// export async function wrongMethod(method, allowedMethod) {
//     if (method !== allowedMethod) {
//         return new Response ("Only " + allowedMethod + " is allowed", {status: 405});
//     }
// }

// export async function handler(req){
//     const requestMethod = req.method;
//     return requestMethod;
// }