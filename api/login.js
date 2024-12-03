"use strict";

import * as func from "./functions.js";

//fetch with a request to "/api/login"
export async function loginHandler(req){
    const options = {
        headers: {"Content-Type": "application/json"}
    };

    // let pathname = new URL(req.url).pathname;

    // console.log("pathname is " + pathname);
    // if (pathname === "/api/login") {
    //     return new Response("success!", {status: 200});
    // }
    const allowedMethod = "POST";
    const requestMethod = req.method;

    //kolla så bodyn inte är tom
    //skicka tillbaka användaren
    
    if (requestMethod === allowedMethod) {
        
        const contentType = req.headers.get("Content-Type");
        const isValidMethod = await func.checkContentType(contentType, "application/json");
        
        if (!isValidMethod) {
            return await func.sendResponse("Incorrect Content-Type, only JSON allowed", 400);
        }

        const currentUser = await req.json();
        const currentUserEmpty = await func.checkBody(currentUser);

        if (currentUserEmpty) {
            return await func.sendResponse("Body can't be empty", 400);
        }

        //Göra om till funktion oskäker på hur dock
        if (!currentUser.username) {
            return new Response("Body must include a username", {status: 400});
        }

        if (!currentUser.password) {
            return new Response("Body must include a password", {status: 400});
        }

        const username = currentUser.username;
        const password = currentUser.password;
        
        const allUsers = await func.getFile("./database/users.json");

        let foundUser;
        for (const user of allUsers) {

            if (username !== user.username && (password !== user.password)) {
                return await func.sendResponse("User not found", 400);

            } else if (username === user.username && (password !== user.password)) {
                return await func.sendResponse("Incorrect password,", 400);

            } else if (username !== user.username && (password === user.password)) {
                return await func.sendResponse("Incorrect username", 400);
            } else {
                foundUser = user;
            }
        }

        const correctUser = func.deleteKey(foundUser, "password");

        for (variable in correctUser) {
            console.log(`${variable}`);
        }
        
        return new Response(JSON.stringify(correctUser), options);
    } else {
        return new Response ("Only POST is allowed", {status: 405});
    }
}

// fetch("http://localhost:8000", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ username: "mikkan", password: "lol123" })
// })
//   .then(response => response.text())
//   .then(console.log)
//   .catch(console.error);

// Deno.serve(handler);