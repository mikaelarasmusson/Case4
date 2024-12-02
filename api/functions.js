"use strict";

export async function getFile(file) {
    return JSON.parse(await Deno.readTextFile(file));
}

export async function sendResponse(text, status) {
     return new Response(text, {status: status});
}

export async function checkContentType(currentType, correctType) {
    return currentType === correctType;
}

export async function checkBody(body) {
    return Object.keys(body).length === 0;
}

export async function deleteKey(object, key) {
    delete object[key];
    return object;
}

export async function checkKey (object, key) {
    if (!object[key]) {
        return 1;
    }
}

