"use strict";

import * as func from "./functions.js";

async function handler(req){

    const requestMethod = req.method;
    const allowedMethod = "POST";

    //kolla så det är application/json
    //kolla så bodyn inte är tom
    //kolla så att username och password finns med
    //kolla så att de stämmer överens
    
            // gör om till en funktion och lääg i functions.js
            // if (!currentUser) {
            //     return new Response("Body can't be empty", {status: 400});
            // };

    if (requestMethod === allowedMethod) {
        console.log(allowedMethod);

        const currentUser = await req.json();
        console.log(currentUser);

        if (!currentUser.username) {
            return new Response("Body must include a username", {status: 400});
        }

        if (!currentUser.password) {
            return new Response("Body must include a password", {status: 400});
        }
 
        const username = currentUser.username;
        const password = currentUser.password;
        
        const allUsers = await func.getFile("./database/users.json");
        console.log(allUsers);

        for (const user of allUsers) {
            console.log(user);

            if (username !== user.username && (password !== user.password)) {
                return new Response("User not found", {status: 404});

            } else if (username === user.username && (password !== user.password)) {
                return new Response("Incorrect password", {status: 400});

            } else if (username !== username.username && (password === user.password)) {
                return new Response("Incorrect username", {status: 400});
            }
        }
        
   








        return new Response("Correct method used!", { status: 200});
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