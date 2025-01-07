import { serveDir, serveFile } from "jsr:@std/http/file-server";
import { loginHandler } from "./login.js";
import { registerHandler } from "./register.js";
import { mediaHandler } from "./media.js";
import { editProfileHandler } from "./edit.js";
import * as func from "./functions.js";

async function HTTPhandler (req) {

    const pathname = new URL(req.url).pathname;

    if (req.method === "GET") {

        if (pathname === "/undefined") {
            return new Response({ status: 400, body: "Undefined path is not allowed." });
        }

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

let activeGames = [];

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
            const gameHost = message.data.host;


            //add a key for every players connection id in order to make the block powerup work also add the host to the playerlist
            //add an id to every game so that they are identifiable and easy to find
            let gameId = 0;
            if (activeGames.length != 0) {
                for (let game of activeGames) {
                    for (let player of game.players) {
                        console.log(player);
                        player.score = 0;
                    }
                    if (gameId < game.id) {
                        gameId = game.id;
                    }
                }
            } else {
                let gameId = 1;
            }
            gameId++;

            let game = {
                id: gameId,
                code: hostCode,
                gameHost: gameHost,
                players: [{connectionId: myId, user: gameHost}]
            }
            activeGames.push(game);
            const returnMessage = {event: message.event, data: game}
            socket.send(JSON.stringify(returnMessage))
        }

        if (message.event == "joinGame") {
            const joinCode = message.data.joinGameCode;

            for (const game of activeGames) {
                if (joinCode == game.code) {
                    const data = {
                        connectionId: myId,
                        user: message.data.user
                    }
                    // game.players.user = message.data.user;
                    // game.players.connectionId = myId;
                    game.players.push(data);
                    const returnMessage = {event: message.event, data: game}
                    for (let id in connections) {
                        connections[id].send(JSON.stringify(returnMessage));
                    }
                }
            }
        }

        if (message.event == "startGame") {
            for (let game of activeGames) {
                console.log(game.gameHost);
                for (let player of game.players) {
                    console.log(player);
                }
                if (game.gameHost.username === message.data.user.username) {
                    const returnMessage = {
                        event: message.event,
                        mediaId: message.data.mediaId,
                        mediaType: message.data.mediaType,
                        game: game
                    }
                    for (let id in connections) {
                        connections[id].send(JSON.stringify(returnMessage));
                    }
                }
            }
        }

        if (message.event == "updatePoints") {
            const currentUser = message.data.user;

            for (const game of activeGames) {
                if (game.id === message.data.game.id) {
                    const players = game.players;

                    for (let player of players) {
                        if (player.user.id === currentUser.id) {
                            player.user.score = currentUser.score;

                            const returnMessage = {event: message.event, data: game};
                            for (const id in connections) {
                                connections[id].send(JSON.stringify(returnMessage));
                            }
                        }
                    }

                }
            }
        }

        if (message.event === "blockUser") {
            for (const game of activeGames) {
                for (const player of game.players) {
                    if (message.data === player.user.username) {
                        const returnMessage = {event: message.event, data: player.user};

                        for (const id in connections) {
                            connections[id].send(JSON.stringify(returnMessage));
                        }
                    }
                }
            }
        }
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