"use strict";

import * as func from "./functions.js";

async function handler(req){

    const allowedMethod = "POST";
    const requestMethod = req.method;

    //kolla så bodyn inte är tom
    //skicka tillbaka användaren
    
    if (requestMethod === allowedMethod) {
        console.log(allowedMethod);
        
        const contentType = req.headers.get("Content-Type");
        const isValidMethod = await func.checkContentType(contentType, "application/json");
        
        if (!isValidMethod) {
            return await func.sendResponse("Incorrect Content-Type, only JSON allowed", 400);
        }

        const currentUser = await req.json();
        console.log(currentUser);
        const currentUserEmpty = await func.checkBody(currentUser);
        console.log(currentUserEmpty);

        if (currentUserEmpty) {
            return await func.sendResponse("Body can't be empty", 400);
        }

        if (!currentUser.username) {
            return new Response("Body must include a username", {status: 400});
        }

        if (!currentUser.password) {
            return new Response("Body must include a password", {status: 400});
        }

        const username = currentUser.username;
        const password = currentUser.password;
        
        const allUsers = await func.getFile("./database/users.json");

        for (const user of allUsers) {
            console.log(user);

            if (username !== user.username && (password !== user.password)) {
                return await func.sendResponse("User not found", 400);

            } else if (username === user.username && (password !== user.password)) {
                return await func.sendResponse("Incorrect password,", 400);

            } else if (username !== user.username && (password === user.password)) {
                return await func.sendResponse("Incorrect username", 400);
            }
        }

        return new Response("Logged in", { status: 200});
    } else {
        return new Response ("Only POST is allowed", {status: 405});
    }

}

// fetch("http://localhost:8000", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ username: "mikkan", password: "hejhej" })
// })
//   .then(response => response.text())
//   .then(console.log)
//   .catch(console.error);




Deno.serve(handler);