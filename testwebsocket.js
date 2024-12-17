"use strict";

// const socket = new WebSocket("http://localhost:8000");

// socket.addEventListener("open", (event) => {
//     console.log("connected");
// })

// socket.addEventListener("message", (event) => {
//     const message = JSON.parse(event.data);
//     console.log("data recieved client ", message.data.user);
// })

// socket.addEventListener("close", (event )=> {
//     console.log("disconnected");
// })

// let user = localStorage.getItem("user");
// let json = JSON.parse(user);

// setTimeout(()=> {
//     let message = {event: "user", data: {user: json}};
//     socket.send(JSON.stringify(message));
// }, 2000)