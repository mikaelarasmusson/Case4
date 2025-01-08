import * as func from "./functions.js";

//fetch with a request to "/api/register"
export async function registerHandler(req) {
    const options = {
        headers: {"Content-Type": "application/json"}
    }

    const usersFilePath = "./database/users.json";
    const allUsers = await func.getFile(usersFilePath);

    if (!allUsers) {
        return func.sendResponse("Internal Server Error", 500);
    }

    const contentType = req.headers.get("Content-Type");
    const isValidContentType = func.checkContentType(contentType, "application/json");

    if (!isValidContentType) {
        return func.sendResponse("Content-Type must be JSON", 400);
    }

    const createdUser = await req.json();
    const createdUserEmpty = func.checkBody(createdUser);

    if (createdUserEmpty) {
        return func.sendResponse("Body can't be empty", 400);
    }

    if (!createdUser.username) {
        return func.sendRequest("Must include a username", 400);
    }

    if (!createdUser.password) {
        return func.sendRequest("Must include a password", 400);
    }

    if (createdUser.username.length < 2) {
        return func.sendRequest("Username must be atleast two characters long", 400);
    }

    if (createdUser.password.length < 2) {
        return func.sendRequest("Password must be atleast two characters long", 400);
    }

    for (let user of allUsers) {
        if (createdUser.username === user.username && createdUser.password === user.password) {
            return func.sendResponse("User already exists", 400);
        } else if (createdUser.username === user.username) {
            return func.sendResponse("Username already in use", 400);
        }
    }

    let highestId = 0;
    for (let user of allUsers) {
        if (highestId < user.id) {
            highestId = user.id;
        }
    }
    let newId = highestId + 1;

    let newUser = {
        id: newId,
        username: createdUser.username,
        password: createdUser.password,
        profileImg: "./images/profilepic.png",
        score: 0,
        totalScore: 0
    }

    allUsers.push(newUser);
    func.writeToFile(usersFilePath, allUsers);

    let correctUser = func.deleteKey(newUser, "password"); 

    return new Response(JSON.stringify(correctUser), options)
}
