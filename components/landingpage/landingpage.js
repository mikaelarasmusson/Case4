"use strict"

function renderLandingpageContainer(parentId) {
  // Get the parent element
  const parent = document.getElementById(parentId);
  console.log(parent);

  // Clear the parent element's content
  parent.innerHTML = "";

  // Create a new container element
  const container = document.createElement("div");
  container.id = "landingpageContainer"; 

  // Append the container to the parent element
  parent.append(container);
  
  // Render the landing page content inside the container
  renderProfileLandingpage(container.id);
  renderLandingpageContent(container.id);
}

// Skapa en egen funktion för profilbilden, poäng och stjärnan
function renderProfileLandingpage(parentId) {
  const parent = document.getElementById(parentId);

  const profileContainer = document.createElement("div");
  profileContainer.id = "profileContainerLandingpage";
  parent.append(profileContainer);

  const profileContent = document.createElement("div");
  profileContent.id = "profileContentLandingpage";
  profileContent.classList.add("profile");
  
  profileContent.innerHTML = `
    <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
        <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
    </svg>
    <p id="userPoints">345</p>
    <img id="profilePic">
  `;

  profileContainer.append(profileContent);
}

function renderPopUpJoinParty(parentId) {

}

function renderLandingpageContent(parentId) {
  // Get the parent element
  const parent = document.getElementById(parentId);

  // Create a new content element
  const contentElement = document.createElement("div");
  contentElement.id = "landingpageContent";
  contentElement.classList.add("landingpage");

  // Set up the content element's HTML
  const userPoints = "";
  const username = "";
  contentElement.innerHTML = `
    <div id="welcomeContainer">    
      <h1 class="landingpageTitle">Make a choice</h1>
      <p class="playText">Welcome back ${username}, how would you like to play?</p>
    </div>
    <div id="buttonContainer">
      <button id="buttonSinglePlayer" class="landingpageButton">Single Player</button>
      <button id="buttonMultiPlayer" class="landingpageButton">Multi Player</button>
      <button id="buttonJoinParty" class="landingpageButton">Join Party</button>
    </div>  
  `;
  // Append the content element to the parent element
  parent.append(contentElement);


  document.querySelector("#buttonSinglePlayer").addEventListener("click", () => {
    renderFilterpageContainer("wrapper");
  });

  document.querySelector("#buttonMultiPlayer").addEventListener("click", () => {
    renderFilterpageContainer("wrapper");
  });

  document.querySelector("#buttonJointParty").addEventListener("click", () => {
    renderPopUpJoinParty("wrapper");
  })
}

renderLandingpageContainer("wrapper");
