function renderQuizpageContainer(parentId) {
    // Get the parent element
    const parent = document.getElementById(parentId);

    // Clear the parent element's content
    parent.innerHTML = "";
  
    // Create a new container element
    const container = document.createElement("div");
    container.id = "leaderpageContainer"; 
  
    // Append the container to the parent element
    parent.append(container);

    document.querySelector("#wrapper").style.margin = "0";

    // Render the landing page content inside the container
    renderProfile(container.id);
    renderTopLeaderboard(container.id)
}


function renderLeaderboardContent(parentId){
    const parent = document.getElementById(parentId);

    const leaderboardContainer = document.createElement("div");
    leaderboardContainer.id = "leaderboardContainer";
    parent.append(profileContainer)
}

function renderTopLeaderboard(parentId){
    const parent = document.getElementById(parentId);

    const leaderBoard = document.createElement("h2");
    leaderBoard.id = "leaderboard";
    parent.append(leaderBoard)

    leaderBoard.innerHTML = `Leaderboard`

    const Topleaderboard = document.createElement("div");
    Topleaderboard.id = "Topleaderboard";
    parent.append(Topleaderboard)

    Topleaderboard.innerHTML = `
    <div class="top_user">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.9912 4.63402C25.9882 4.47439 25.9856 4.33656 25.9856 4.22031H21.2944C21.385 2.26969 21.3242 0.613998 21.3242 0.613998H13.0504C13.031 0.614085 13.0116 0.615138 12.9924 0.617154C12.9731 0.615135 12.9537 0.614082 12.9343 0.613998H4.63951C4.63951 0.613998 4.57869 2.26969 4.66922 4.22031H0V6.02347H0.00934339C0.0564088 7.49394 0.298351 9.46068 1.30541 11.474C2.15955 13.1818 3.38952 14.6106 4.96131 15.7208C6.26254 16.64 7.74931 17.3022 9.38377 17.6978C10.3277 18.6759 11.2585 19.2152 12.071 19.432V21.4394C11.955 22.0358 11.2504 24.055 6.33926 24.055H5.57124V25.8582H20.4279V24.055H19.6631C13.9013 24.055 13.9281 21.2751 13.9281 21.2751V19.4317C14.7406 19.2152 15.6534 18.6781 16.5924 17.705C18.2388 17.3103 19.7304 16.6456 21.0397 15.7208C22.6114 14.6105 23.8406 13.1817 24.6947 11.474C26.0689 8.72634 26.018 6.06421 25.9912 4.63402ZM2.97493 10.686C2.13576 9.00803 1.91616 7.31926 1.86793 6.02347H4.79788C4.84826 6.52576 4.91198 7.02089 4.99264 7.4874C5.48668 10.3448 6.16568 12.8683 7.4506 15.095C5.48686 14.1291 3.94455 12.6247 2.97493 10.686ZM23.0241 10.686C22.0488 12.6363 20.4937 14.147 18.5132 15.1122C19.8025 12.8813 20.4757 10.3522 20.9711 7.48746C21.0517 7.02089 21.1155 6.52576 21.1658 6.02352H24.1311C24.0829 7.31926 23.8634 9.00803 23.0241 10.686Z" fill="#A4A4A4"/>
        </svg>
        <div id= "user">
            <img id="profilePic_user1">
            <div class ="user_info">
                <p class= name>Bella</p>
                <div id="user_content">
                    <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                    <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
                    </svg>
                    <p id="userPoints">34</p>

                </div>
            </div>
        </div>
    </div>

    <div class="top_user1">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.9912 4.63402C25.9882 4.47439 25.9856 4.33656 25.9856 4.22031H21.2944C21.385 2.26969 21.3242 0.613998 21.3242 0.613998H13.0504C13.031 0.614085 13.0116 0.615138 12.9924 0.617154C12.9731 0.615135 12.9537 0.614082 12.9343 0.613998H4.63951C4.63951 0.613998 4.57869 2.26969 4.66922 4.22031H0V6.02347H0.00934339C0.0564088 7.49394 0.298351 9.46068 1.30541 11.474C2.15955 13.1818 3.38952 14.6106 4.96131 15.7208C6.26254 16.64 7.74931 17.3022 9.38377 17.6978C10.3277 18.6759 11.2585 19.2152 12.071 19.432V21.4394C11.955 22.0358 11.2504 24.055 6.33926 24.055H5.57124V25.8582H20.4279V24.055H19.6631C13.9013 24.055 13.9281 21.2751 13.9281 21.2751V19.4317C14.7406 19.2152 15.6534 18.6781 16.5924 17.705C18.2388 17.3103 19.7304 16.6456 21.0397 15.7208C22.6114 14.6105 23.8406 13.1817 24.6947 11.474C26.0689 8.72634 26.018 6.06421 25.9912 4.63402ZM2.97493 10.686C2.13576 9.00803 1.91616 7.31926 1.86793 6.02347H4.79788C4.84826 6.52576 4.91198 7.02089 4.99264 7.4874C5.48668 10.3448 6.16568 12.8683 7.4506 15.095C5.48686 14.1291 3.94455 12.6247 2.97493 10.686ZM23.0241 10.686C22.0488 12.6363 20.4937 14.147 18.5132 15.1122C19.8025 12.8813 20.4757 10.3522 20.9711 7.48746C21.0517 7.02089 21.1155 6.52576 21.1658 6.02352H24.1311C24.0829 7.31926 23.8634 9.00803 23.0241 10.686Z" fill="#FFD07A"/>
        </svg>
        <div id= "user">
            <img id="profilePic_user2">
            <div class ="user_info">
                <p class= name>Bella</p>
                <div id="user_content">
                    <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                    <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
                    </svg>
                    <p id="userPoints">34</p>

                </div>
            </div>
        </div>
    </div>

    <div class="top_user">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.9912 4.63402C25.9882 4.47439 25.9856 4.33656 25.9856 4.22031H21.2944C21.385 2.26969 21.3242 0.613998 21.3242 0.613998H13.0504C13.031 0.614085 13.0116 0.615138 12.9924 0.617154C12.9731 0.615135 12.9537 0.614082 12.9343 0.613998H4.63951C4.63951 0.613998 4.57869 2.26969 4.66922 4.22031H0V6.02347H0.00934339C0.0564088 7.49394 0.298351 9.46068 1.30541 11.474C2.15955 13.1818 3.38952 14.6106 4.96131 15.7208C6.26254 16.64 7.74931 17.3022 9.38377 17.6978C10.3277 18.6759 11.2585 19.2152 12.071 19.432V21.4394C11.955 22.0358 11.2504 24.055 6.33926 24.055H5.57124V25.8582H20.4279V24.055H19.6631C13.9013 24.055 13.9281 21.2751 13.9281 21.2751V19.4317C14.7406 19.2152 15.6534 18.6781 16.5924 17.705C18.2388 17.3103 19.7304 16.6456 21.0397 15.7208C22.6114 14.6105 23.8406 13.1817 24.6947 11.474C26.0689 8.72634 26.018 6.06421 25.9912 4.63402ZM2.97493 10.686C2.13576 9.00803 1.91616 7.31926 1.86793 6.02347H4.79788C4.84826 6.52576 4.91198 7.02089 4.99264 7.4874C5.48668 10.3448 6.16568 12.8683 7.4506 15.095C5.48686 14.1291 3.94455 12.6247 2.97493 10.686ZM23.0241 10.686C22.0488 12.6363 20.4937 14.147 18.5132 15.1122C19.8025 12.8813 20.4757 10.3522 20.9711 7.48746C21.0517 7.02089 21.1155 6.52576 21.1658 6.02352H24.1311C24.0829 7.31926 23.8634 9.00803 23.0241 10.686Z" fill="#985A28"/>
        </svg>
        <div id= "user">
            <img id="profilePic_user3">
            <div class ="user_info">
                <p class= name>Bella</p>
                <div id="user_content">
                    <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                    <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
                    </svg>
                    <p id="userPoints">34</p>

                </div>
            </div>
        </div>
    </div>`

    const leaderBoard_container = document.createElement("div");
    leaderBoard_container.id = "leaderBoard_container";
    parent.append(leaderBoard_container)


    const leaderBoard_list = document.createElement("div");
    leaderBoard_list.id = "leaderboard_list";
    leaderBoard_container.append(leaderBoard_list)

    leaderBoard_list.innerHTML = `
        <div id="the_resttop">
            <h2>4</h2>
            <img id="profilePic">
            <p class= name>Bella</p>
        </div>

        <div id="user_content">
            <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
            <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
            </svg>
            <p id="userPoints">34</p>

        </div>
        `
}



function renderProfile(parentId) {
    const parent = document.getElementById(parentId);
  
    const profileContainer = document.createElement("div");
    profileContainer.id = "profileContainer";
    parent.append(profileContainer);
  
    const profileContent = document.createElement("div");
    profileContent.id = "profileContent";
    profileContent.classList.add("profile");
    
    profileContent.innerHTML = `
      <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
          <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
      </svg>
      <p id="userPoints">345</p>
      <img id="profilePic">
    `;
  
    renderBackArrow(profileContainer.id);

    profileContainer.append(profileContent);

  }



  function renderBackArrow(parentId) {
    const parent = document.getElementById(parentId);
    const backArrow = document.createElement("button");
    backArrow.id = "backArrow";
    backArrow.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
            <path d="M9 19.6567L0 10L9 0.343346L11.1 2.67704L5.775 8.39056H24V11.6094H5.775L11.1 17.323L9 19.6567Z" fill="white"/>
        </svg>
    `;
    parent.append(backArrow);
}
  

// renderQuizpageContainer("wrapper")