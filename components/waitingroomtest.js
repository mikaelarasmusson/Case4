"use strict";

async function waitingRoom(data) {

    console.log(data);

    let parent = document.getElementById("wrapper");
    parent.innerHTML = "";

    let waitingRoom = document.createElement("div");
    parent.append(waitingRoom);

    let code = document.createElement("div");
    code.textContent = data.code;
    if (code.textContent != "") {
        waitingRoom.appendChild(code);
    }

    let host = document.createElement("div");
    host.textContent = data.gameHost.username;
    if (host.textContent != "") {
        waitingRoom.appendChild(host);
    }

    for (let player of data.players) {
        let newPlayer = document.createElement("div");
        newPlayer.textContent = player.username;
        waitingRoom.appendChild(newPlayer);
    }

    // let waitingRoom = document.createElement("div");
    // parent.append(waitingRoom);

    // console.log(data);
    // console.log(parent);

    // let waitingRoomHost = document.createElement("div");
    // let waitingRoomUser = document.createElement("div");
    // let code = document.createElement("div");

    // if (data.host) {
    //     waitingRoomHost.textContent = data.host.username;
    //     code.textContent = data.newGameCode
    //     waitingRoom.appendChild(waitingRoomHost);
    //     waitingRoom.appendChild(code);
    // } 

    // if (data.user) {
    //     waitingRoomUser.textContent = data.user.username;
    //     waitingRoom.appendChild(waitingRoomUser);
    // }

}