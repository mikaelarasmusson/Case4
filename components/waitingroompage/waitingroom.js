function renderWaitingRoom(parentId, userData){

    const parent = document.getElementById(parentId);
    parent.innerHTML = "";

    const waitingRoomWrapper = document.createElement("div");
    waitingRoomWrapper.id = "waitingRoomWrapper" 
    parent.appendChild(waitingRoomWrapper)

    renderProfileWithBackArrow(waitingRoomWrapper.id)

    const container = document.createElement("div");
    container.id = "waitingRoomContainer";
    waitingRoomWrapper.appendChild(container);

    renderPinContainer(container.id);
    renderJoinedUser (container.id, userData);
    renderWaitingRoomFooter(container.id)
}

function renderPinContainer(parentId){
    const parent = document.getElementById(parentId);

    const pinContainer = document.createElement("div");
    pinContainer.id = "pinContainer";
    parent.appendChild(pinContainer);

    pinContainer.innerHTML = `
    <p>Game PIN</p>
    <p id = "pinCode"> 1234 </p>`
}

function renderJoinedUser (parentId, userData){
    const parent = document.getElementById(parentId);

    const joinedUsersContainer = document.createElement("div");
    joinedUsersContainer.id = "joinedUsersContainer";
    parent.appendChild(joinedUsersContainer);

    const joinedUsersCounter = document.createElement("div");
    joinedUsersCounter.id = "joinedUsersCounter";
    joinedUsersContainer.appendChild(joinedUsersCounter);
    
    joinedUsersCounter.innerHTML = `<p id = "playersCounter"> ${userData.length} Player${userData.length > 1 ? "s" : ""}</p>` 

    const joinedUsersList = document.createElement("div");
    joinedUsersList.id = "joinedUsersList";
    joinedUsersContainer.appendChild(joinedUsersList);
    
    userData.forEach((user, index) => {
        const joinedUsersBox = document.createElement("div");
        joinedUsersBox.className = "joinedUsersBox";
        joinedUsersList.appendChild(joinedUsersBox);

        joinedUsersBox.innerHTML = `
            <div class="the_resttop">
                <img class="profilePic_users" src="${user.profileImg}" alt="${user.username}'s profile picture">
                <p class="name">${user.username}</p>
            </div>
            <div class="user_content">
                <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                    <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
                </svg>
                <p class="userPoints">${user.score}</p>
            </div>`;
    });
}

function renderWaitingRoomFooter(parentId){
    const parent = document.getElementById(parentId);

    const waitingRoomFooter = document.createElement("div");
    waitingRoomFooter.id = "waitingRoomFooter";
    parent.appendChild(waitingRoomFooter);

    waitingRoomFooter.innerHTML = `
    <button id="gameInfo">How does it work?</button>
    <button id="startGame">Start Quiz</button>`

    document.getElementById("gameInfo").addEventListener("click",() =>{

    });

    document.getElementById("startGame").addEventListener("click",() =>{

    });


}