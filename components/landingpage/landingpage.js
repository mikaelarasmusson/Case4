"use strict";

const joinGameSocket = new WebSocket("http://localhost:8000");

joinGameSocket.addEventListener("open", (event) => {
  console.log("connected");
})

joinGameSocket.addEventListener("message", (event) => {

  const message = JSON.parse(event.data);

  if (message.event == "joinGame") {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));

    for (let player of message.data.players) {
      if (currentUser.id === player.user.id) {
        renderWaitingRoom("wrapper", message.data);
      }
    }
  }
})

joinGameSocket.addEventListener("close", (event) => {
  console.log("disconnected");
})

// Landingpage wrapper
function renderLandingpageWrapper(parentId) {
  const parent = document.getElementById(parentId);

  parent.innerHTML = "";

  const landingpageWrapper = document.createElement("div");
  landingpageWrapper.id = "landingpageWrapper";
  parent.append(landingpageWrapper);

  renderLandingpageContainer(landingpageWrapper.id);
}
// Container for landingpage
function renderLandingpageContainer(parentId) {
  const parent = document.getElementById(parentId);

  const container = document.createElement("div");
  container.id = "landingpageContainer";
  parent.append(container);

  renderProfileLandingpage(container.id);
  renderLandingpageContent(container.id);
}

// En funktion för profilbilden, poäng och stjärnan
function renderProfileLandingpage(parentId) {
  const parent = document.getElementById(parentId);

  const profileContainer = document.createElement("div");
  profileContainer.id = "profileContainerLandingpage";
  parent.append(profileContainer);

  const profileContent = document.createElement("div");
  profileContent.id = "profileContentLandingpage";
  profileContent.classList.add("profile");

  // let userInfo = State.get("users");
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  profileContent.innerHTML = `
    <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
        <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
    </svg>
    <p id="userPoints">${currentUser.totalScore}</p>
    <img id="profilePic" src="${currentUser.profileImg}">
  `;

  profileContainer.append(profileContent);

  const profilePic = document.querySelector("#profilePic");
  profilePic.addEventListener("click", () => {
    document.getElementById("wrapper").innerHTML = "";
    renderProfilePageContainer("wrapper");
  });
}

// Content for landingpage
function renderLandingpageContent(parentId) {
  const parent = document.getElementById(parentId);

  const contentElement = document.createElement("div");
  contentElement.id = "landingpageContent";
  contentElement.classList.add("landingpage");

  const username = State.get("users");
  const user = JSON.parse(sessionStorage.getItem("user"));

  contentElement.innerHTML = `
    <div id="welcomeContainer">    
      <h1 class="landingpageTitle">Make a choice</h1>
      <p class="playText">Welcome back ${user.username}, how would you like to play?</p>
    </div>
    <div id="buttonContainer">
      <button id="buttonSinglePlayer" class="landingpageButton">Single-Player</button>
      <button id="buttonHostParty" class="landingpageButton">Host Party</button>
      <button id="buttonJoinParty" class="landingpageButton">Join Party</button>
    </div>  
  `;
  parent.append(contentElement);

  document.querySelector("#buttonSinglePlayer").addEventListener("click", () => {
      localStorage.setItem("gameMode", "singleplayer");
      renderFilterpageContainer("wrapper");
    });

  document.querySelector("#buttonHostParty").addEventListener("click", () => {
    localStorage.setItem("gameMode", "multiplayer");
    renderFilterpageContainer("wrapper");
  });

  document.querySelector("#buttonJoinParty").addEventListener("click", () => {
    renderPopUpJoinParty(parentId);
  });
}

// Pop-up for joining party
function renderPopUpJoinParty(parentId) {
  const parent = document.getElementById(parentId);

  if (document.getElementById("joinPartyPopUp")) {
    return;
  }

  const joinPartyPopUp = document.createElement("div");
  joinPartyPopUp.id = "partyPopUp";
  joinPartyPopUp.innerHTML = `
    <button id="partyPopUpClose">
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
        <path d="M19 2.40949L17.0796 0.489136L9.5 8.06878L1.92036 0.489136L0 2.40949L7.57964 9.98914L0 17.5688L1.92036 19.4891L9.5 11.9095L17.0796 19.4891L19 17.5688L11.4204 9.98914L19 2.40949Z" fill="white"/>
      </svg>
    </button>
    <div id="partyPopUpContent">
      <p class="popupEmoji">🎬</p>
      <p class="partyPopUpTitle">Enter game PIN to join the quiz!</p>
      <input id="pinInputText" inputmode="numeric" placeholder="PIN" required maxlength="6">
      <button id="joinPartyButton">OK</button>
    </div>
  `;

  joinPartyPopUp.querySelector("#partyPopUpClose").addEventListener("click", () => {
    joinPartyPopUp.remove();
  });

  parent.appendChild(joinPartyPopUp);

  document.getElementById("joinPartyButton").addEventListener("click", (event) => {
    const inputCodeString = document.getElementById("pinInputText").value;
    const inputCode = parseInt(inputCodeString);
    
    const user = sessionStorage.getItem("user");
    const json = JSON.parse(user);

    const message = {event: "joinGame", data: {joinGameCode: inputCode, user: json}}
    joinGameSocket.send(JSON.stringify(message));
  })

  // joinPartyPopUp.querySelector("#joinPartyButton").addEventListener("click", () => {
  //   renderWaitingRoom("wrapper", State.get("users"));
  // });

}

renderLandingpageContainer("wrapper");
