"use strict"

async function fetcher (request) {
    try {
        const response = await fetch(request);
        return response;
    } catch (error) {
        console.log(error);
    }
}