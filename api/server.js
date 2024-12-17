import { serveDir, serveFile } from "jsr:@std/http/file-server";
import { loginHandler } from "./login.js";
import { registerHandler } from "./register.js";
import { mediaHandler } from "./media.js";
import { editProfileHandler } from "./edit.js";
import * as func from "./functions.js";

async function HTTPhandler (req) {

    const pathname = new URL(req.url).pathname;

    if (req.method === "GET") {
        if (pathname === "/api/films") {
            return mediaHandler(req, pathname);
        }

        if (pathname === "/api/series") {
            return mediaHandler(req, pathname);
        }

        if (pathname === "/api/quizfilms") {
            return mediaHandler(req, pathname);
        }

        if (pathname === "/api/quizseries") {
            return mediaHandler(req, pathname);
        }

        if (pathname === "/api/users") {
            return mediaHandler(req, pathname);
        }
    }

    if (req.method === "POST") {
        if (pathname === "/api/login") {
            return loginHandler(req);
        }

        if (pathname === "/api/register") {
            return registerHandler(req);
        }
    }

    if (req.method === "PATCH") {
        if (pathname === "/api/edit") {
            return editProfileHandler(req);
        }
    }

    if (req.method === "DELETE") {
        //do something
    }

    if (pathname.startsWith("/")) {
        return await serveDir(req, {
            fsRoot: "../",
            urlRoot: ""
        })
    }
}

let connections = {};
let connectionId = 1;

let gameCodes = [];


async function handleWebsocket(request) {
    const {socket, response} = Deno.upgradeWebSocket(request);

    let myId = connectionId++;

    socket.addEventListener("open", (event) => {
        console.log(`Connection ${myId} connected`);
        connections[myId] = socket;
        console.log(connections);
    })

    socket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        console.log("server received", message);

        if (message.event == "createdGame") {
            const hostCode = message.data.newGameCode;
            gameCodes.push(hostCode);
            socket.send(JSON.stringify(gameCodes));
        }

        //för att inte skicka till sig själv
        // for (let id in connections) {
        //     console.log(id);
        //     if (id != myId) {
        //         const connection = connections[id];
        //         connection.send(JSON.stringify(message))
        //     }
        // }

    })

    socket.addEventListener("close", (event )=> {
        console.log(`Connection ${myId} disconnected`);
        delete connections[myId];
    })

    return response;
}

async function handleRequest(request) {
    if (request.headers.get("upgrade") == "websocket") {
        return handleWebsocket(request);
    } else {
        return HTTPhandler(request);
    }
} 

Deno.serve(handleRequest);