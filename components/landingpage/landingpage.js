"use strict"

function renderLandingpageContainer(parentId) {
  // Get the parent element
  const parent = document.getElementById(parentId);

  // Clear the parent element's content
  parent.innerHTML = '';

  // Create a new container element
  const container = document.createElement('div');
  container.id = 'landingpageContainer';

  // Render the landing page content inside the container
  renderLandingpageContent(container.id);

  // Append the container to the parent element
  parent.append(container);
}

function renderLandingpageContent(parentId) {
  // Get the parent element
  const parent = document.getElementById(parentId);

  // Create a new content element
  const contentElement = document.createElement('div');
  contentElement.id = 'landingpageContent';
  contentElement.classList.add('landingpage');

  // Set up the content element's HTML
  const userPoints = '';
  const username = '';
  
  contentElement.innerHTML = `
    <img id="starPoints" src="" alt="Star Points">
    <p id="userPoints">${userPoints}</p>
    <img id="profilePic" src="" alt="Profile Picture">
    <h1 class="landingpageTitle">Make a choice</h1>
    <p class="playText">Welcome back ${username}, how would you like to play?</p>
    <button id="buttonSinglePlayer" class="landingpageButton">Single Player</button>
    <button id="buttonMultiPlayer" class="landingpageButton">Multi Player</button>
    <button id="buttonJoinParty" class="landingpageButton">Join Party</button>
  `;

  // Append the content element to the parent element
  parent.append(contentElement);
}