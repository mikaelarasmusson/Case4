"use strict";

import * as func from "./functions.js";

//fetch with a request to "/api/edit"
export async function editProfileHandler(req) {
    const options = {
        headers: {"Content-Type": "application/json"}
    };

    const allUsers = await func.getFile("./database/users.json");

    if (!allUsers) {
        return func.sendResponse("Internal server error", 500);
    }

    const currentUser = await req.json();
    const currentUserEmpty = func.checkBody(currentUser);

    if (currentUserEmpty) {
        return func.sendResponse("Body can't be empty", 400);
    }

    let userToEdit;
    for (let user of allUsers) {
        if (currentUser.id === user.id) {
            userToEdit = user;
        }
    }
    if (!userToEdit) {
        return func.sendResponse("user not found", 404);
    }

    for (const key in currentUser) {
        userToEdit[key] = currentUser[key];
    }

    func.writeToFile("./database/users.json", allUsers);
    
    const updatedUser = await func.deleteKey(userToEdit, "password");
    return new Response(JSON.stringify(updatedUser), options);
}
