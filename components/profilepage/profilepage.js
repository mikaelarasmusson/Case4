"use strict"

function renderProfilePageContainer (parentId) {
    const parent = document.getElementById(parentId);

    const container = document.createElement("div");
    container.id = "profilePageContainer";

    parent.append(container);

    // Rendera allt här
}

function renderProfilePageBackArrow (parentId) {
    const parent = document.getElementById(parentId);

    const profileArrowTitleContainer = document.createElement("div");
    profileArrowTitleContainer.id = "profileArrowTitleContainer";
    
    profileArrowTitleContainer.innerHTML = `
    <button id="backArrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
            <path d="M9 19.6567L0 10L9 0.343346L11.1 2.67704L5.775 8.39056H24V11.6094H5.775L11.1 17.323L9 19.6567Z" fill="white"/>
        </svg>
    </button>
    <h2 id="profileTitle">My Profile</h2>
    `;

    parent.appendChild(profileArrowTitleContainer);

    document.getElementById("backArrow").addEventListener("click", () => {
        renderLandingpageContainer("wrapper");
    });
}

function renderMyProfileContent (parentId) {
    const parent = document.getElementById(parentId);

    const myProfileContentContainer = document.createElement("div");
    myProfileContentContainer.id = "myProfileContentContainer";

    let userInfo = State.get("users");

    myProfileContentContainer.innerHTML = `
    <div id="profileInfoPic">
        <img id="myProfilePic" src="${userInfo.profileImg}">
        <div id="starAndScore">
            <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
            </svg>
            <p id="userPoints">${userInfo.score}</p>
        </div>
        <input id="profileName" name="Profile Name" type="text" placeholder="${userInfo.username}">
        <input id="profilePassword" name="Password" type="password" placeholder="**********">
    </div>
    `;
}