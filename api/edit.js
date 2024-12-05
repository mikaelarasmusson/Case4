"use strict";

import * as func from "./functions.js";

//kolla så id:t stämmer med en profil sen kolla om det finns bara username/password/image eller om allt finns med.

export async function editProfileHandler(req) {
    const options = {
        headers: {"Content-Type": "application/json"}
    };

    const allUsers = await func.getFile("./database/users.json");
    console.log(allUsers);

    if (!allUsers) {
        return func.sendResponse("Internal server error", 500);
    }

    const currentUser = await req.json();
    console.log(currentUser);
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

export async function updateScore() {
    console.log("hej, det här kansek ska vara websocket jag vet inte");
}