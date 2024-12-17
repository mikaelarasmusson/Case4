// "use strict";

// let connections = {};
// let connectionId = 1;

// export async function handleWebsocket(request) {

//     if (request.headers.get("upgrade") != "websocket") {
//         return new Response(null, {status: 501});
//     }

//     const {socket, response} = Deno.upgradeWebSocket(request);

//     let myId = connectionId++;

//     socket.addEventListener("open", (event) => {
//         console.log(`Connection ${myId} connected`);
//         connections[myId] = socket;
//         console.log(connections);
//     })

//     socket.addEventListener("message", (event) => {

//     })

//     socket.addEventListener("close", (event )=> {
//         console.log(`Connection ${myId} disconnected`);
//         delete connections[myId];
//     })

//     return response;

// }

// Deno.serve(handleWebsocket);