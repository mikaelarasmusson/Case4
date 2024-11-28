"use strict"

function renderLandingpageContainer (parentId) {
    const parent = document.getElementById(parentId);
    parent.innerHTML = null;
    const selfId = "landingpageContainer";
    let dom = document.createElement("div");
    dom.id = selfId;

    parent.append(dom);
    renderLandingpageContent(selfId);
}

function renderLandingpageContent (parentId) {
    const parent = document.getElementsById(parentId);
    const selfId = "landingpageContent";
    let dom = document.createElement("div");
    dom.id = selfId;
    dom.classList.add("landingpage");

    let userPoints = "";
    let username = "";

    dom.innerHTML = `
    <img id="starPoints" src="" alt="Star Points">
    <p id="userPoints">${userPoints}</p>
    <img id="profilePic" src="" alt="Profile Picture">
    <h1 class="landingpageTitle">Make a choice</h1>
    <p class="playText">Welcome back ${username}, how would you like to play?</p>
    <button id="buttonSinglePlayer" class="landingpageButton">Single Player</button>
    <button id="buttonMultiPlayer" class="landingpageButton">Multi Player</button>
    <button id="buttonJoinParty" class="landingpageButton">Join Party</button>
    `;

    parent.append(dom);
}