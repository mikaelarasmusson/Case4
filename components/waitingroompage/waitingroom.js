const quizSocket = new WebSocket("http://localhost:8000");

quizSocket.addEventListener("open", (event) => {
    console.log("connected");
}); 

quizSocket.addEventListener("message", (event)=> {
    const message = JSON.parse(event.data);

    if (message.event == "startGame") {
        const pin = parseInt(document.getElementById("pinCode").textContent);
        if (pin === message.game.code) {
            const currentUser = JSON.parse(sessionStorage.getItem("user"));
            for (let player of message.game.players) {
                if (currentUser.id === player.user.id) {
                    console.log(message);
                    renderQuizpageContent("wrapper", message.mediaId, message.mediaType, "multiplayer");
                    updateCurrentGame(message.game);
                }
            }
        }
    }
});

quizSocket.addEventListener("close", (event) => {
    console.log("disconneted");
});


function renderWaitingRoom(parentId, userData){

    console.log(userData);
    const parent = document.getElementById(parentId);
    parent.innerHTML = "";

    const waitingRoomWrapper = document.createElement("div");
    waitingRoomWrapper.id = "waitingRoomWrapper" 
    parent.appendChild(waitingRoomWrapper)

    renderProfileWithBackArrow(waitingRoomWrapper.id)

    const container = document.createElement("div");
    container.id = "waitingRoomContainer";
    waitingRoomWrapper.appendChild(container);

    renderPinContainer(container.id, userData);
    renderJoinedUser (container.id, userData);
    renderWaitingRoomFooter(container.id, userData);
}

function renderPinContainer(parentId, gameData){
    const parent = document.getElementById(parentId);

    const pinContainer = document.createElement("div");
    pinContainer.id = "pinContainer";
    parent.appendChild(pinContainer);

    pinContainer.innerHTML = `
    <p>Game PIN</p>
    <p id = "pinCode">${gameData.code}</p>`;
}

function renderJoinedUser (parentId, userData){
    const parent = document.getElementById(parentId);

    let joinedUsersContainer = document.createElement("div");
    joinedUsersContainer = document.createElement("div");
    joinedUsersContainer.id = "joinedUsersContainer";
    parent.appendChild(joinedUsersContainer);

    const joinedUsersCounter = document.createElement("div");
    joinedUsersCounter.id = "joinedUsersCounter";
    joinedUsersContainer.appendChild(joinedUsersCounter);

    
    joinedUsersCounter.innerHTML = `<p id = "playersCounter"> ${userData.players.length} Player${userData.length > 1 ? "s" : ""}</p>` 

    let joinedUsersList = document.createElement("div");
    joinedUsersList.id = "joinedUsersList";
    joinedUsersContainer.appendChild(joinedUsersList);

    for (let user of userData.players) {
        console.log(user)
        const joinedUsersBox = document.createElement("div");
        joinedUsersBox.className = "joinedUsersBox";
        joinedUsersList.appendChild(joinedUsersBox);

        joinedUsersBox.innerHTML = `
            <div class="the_resttop">
                <img class="profilePic_users" src="${user.user.profileImg}" alt="${user.user.username}'s profile picture">
                <p class="name">${user.user.username}</p>
            </div>
            <div class="user_content">
                <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                    <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
                </svg>
                <p class="userPoints">${user.score}</p>
            </div>`;
    }
}

function renderWaitingRoomFooter(parentId, gameHost){
    const parent = document.getElementById(parentId);

    const waitingRoomFooter = document.createElement("div");
    waitingRoomFooter.id = "waitingRoomFooter";
    parent.appendChild(waitingRoomFooter);

    const host = JSON.parse(sessionStorage.getItem("user"));
    if (host.username === gameHost.gameHost.username) {
        waitingRoomFooter.innerHTML = `
        <button id="gameInfo">How does it work?</button>
        <button id="startGame">Start Quiz</button>`;
    } else {
        waitingRoomFooter.innerHTML = `
        <button id="gameInfo">How does it work?</button>`;
    }

    document.getElementById("gameInfo").addEventListener("click",() =>{
        renderGameRulesPopUp(parentId);
    });

    document.getElementById("startGame").addEventListener("click",() =>{
        
        const currentUser = JSON.parse(sessionStorage.getItem("user"));
        console.log(gameHost.gameHost.username);
        console.log(currentUser.username);
        const quizToStart = parseInt(sessionStorage.getItem("mediaId"));
        const mediaType = sessionStorage.getItem("mediaType");
        const data = {
            mediaId: quizToStart,
            mediaType: mediaType,
            user: currentUser
        }
        // skicka startgame till alla och skicka med rätt film/serie id
        const message = {event: "startGame", data: data}
        quizSocket.send(JSON.stringify(message));
        // renderQuizpageContent("wrapper", mediaInt);
        //nytt event startGame så att quizzet startas för alla samtidigt. Lägg till websocket för det bara hosten kan starta.
    });
}


function renderGameRulesPopUp(parentId) {
    const parent = document.getElementById(parentId);

    const gameRulesPopUp = document.createElement("div");
    gameRulesPopUp.id = "gameRulesPopUp";
    parent.appendChild(gameRulesPopUp);

    const exitPopUpButton = document.createElement("button");
    exitPopUpButton.id = "exitRulePopUpButton";
    exitPopUpButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path d="M19 1.92036L17.0796 0L9.5 7.57964L1.92036 0L0 1.92036L7.57964 9.5L0 17.0796L1.92036 19L9.5 11.4204L17.0796 19L19 17.0796L11.4204 9.5L19 1.92036Z" fill="white"/>
        </svg>
    `;
    parent.appendChild(exitPopUpButton);

    gameRulesPopUp.innerHTML = `
        <div id="gameRulesPopUpContent">
            <h2>How it works</h2>
            <div id="goal" class="rule">
                <p>🎯 The goal</p>
                <p>Answer as many questions correctly to test your knowledge!</p>
            </div>
            <div id="time" class="rule">
                <p>⏰ Time limit</p>
                <p>Each question has a 15-second timer — think quickly!</p>
            </div>
            <div id="point" class="rule">
                <p>⭐ Earn points️</p>
                <ul>
                    <li>150 points for the fastest answer</li>
                    <li>Lose 10 points for every second you wait</li>
                </ul>
            </div>
            <div id="superPowersContainer">
                <div id="superPowers" class="powers">
                    <div class="powerBox">
                        <p>🪄</p>
                    </div>
                    <div class="textBox">
                        <p>Superpowers</p>
                        <p>This is where you keep your superpowers</p>
                    </div>
                    <div class="powerBox">
                        <p>x2</p>
                    </div>
                    <div class="textBox">
                        <p>Double points</p>
                        <p>Boost your score on one question</p>
                    </div>
                    <div class="powerBox">
                        <p>🤚🏼</p>
                    </div>
                    <div class="textBox">
                        <p>Block a friend</p>
                        <p>Stop an opponent from answering a question</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    exitPopUpButton.addEventListener("click", () => {
        gameRulesPopUp.remove();
        exitPopUpButton.remove();
    });
}