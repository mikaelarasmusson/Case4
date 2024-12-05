"use strict";

export async function getFile(file) {
    return JSON.parse(await Deno.readTextFile(file));
}

export async function writeToFile(file, data) {
    const json = JSON.stringify(data, null, 2);
    await Deno.writeTextFile(file, json);
}

export function sendResponse(text, status) {
     return new Response(text, {status: status});
}

export function checkContentType(currentType, correctType) {
    return currentType === correctType;
}

export function checkBody(body) {
    return Object.keys(body).length === 0;
}

export function deleteKey(object, key) {
    delete object[key];
    return object;
}

// export async function editProfile (allUsers, editedUser) {
//     for (let i = 0; i < allUsers.length; i++) {
//         if (allUsers[i].id === editedUser.id) {
//             allUsers[i] = editedUser;
//         }
//     }
//     return allUsers
// }

export async function checkKey (object, key) {
    if (!object[key]) {
        return 1;
    }
}

