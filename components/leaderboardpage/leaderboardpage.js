function renderLeaderboardpageContainer(parentId, game, singleplayerPoints) {
    // Get the parent element
    const parent = document.getElementById(parentId);

    const leaderboard_page_wrapper = document.createElement("div");
    leaderboard_page_wrapper.id = "leaderboardpage_wrapper";
    parent.append(leaderboard_page_wrapper)

    // Clear the parent element's content
    parent.innerHTML = "";
  
    // Create a new container element
    const container = document.createElement("div");
    container.id = "leaderpageContainer"; 
  

    // Append the container to the parent element
    parent.append(leaderboard_page_wrapper);

    renderProfileWithBackArrow(leaderboard_page_wrapper.id)

    leaderboard_page_wrapper.append(container)


    // Render the landing page content inside the container
    renderTopLeaderboard(container.id, game, singleplayerPoints)
}


function renderLeaderboardContent(parentId){
    const parent = document.getElementById(parentId);

    const leaderboardContainer = document.createElement("div");
    leaderboardContainer.id = "leaderboardContainer";
    parent.append(profileContainer)
}

function renderTopLeaderboard(parentId, game, singleplayerPoints){

    // const players = game.players;
    const onlyPlayers = [];
    let players;
    if (game) {
        players = game.players;
        for (let player of players) {
            onlyPlayers.push(player.user);
        }
    }

    const allUsers = [...State.get("users")];

    const sortedUsers = onlyPlayers.sort((a, b) => b.score - a.score);

    const parent = document.getElementById(parentId);

    const leaderBoard = document.createElement("h2");
    leaderBoard.id = "leaderboard";
    parent.append(leaderBoard)

    leaderBoard.innerHTML = `Leaderboard`

    const Topleaderboard = document.createElement("div");
    Topleaderboard.id = "Topleaderboard";
    parent.append(Topleaderboard);

    const leaderBoard_container = document.createElement("div");
    leaderBoard_container.id = "leaderBoard_container";
    parent.append(leaderBoard_container)

    const leaderBoard_h2 = document.createElement("h2");
    leaderBoard_h2.id = "leaderBoard_h2";
    leaderBoard_container.append(leaderBoard_h2);
    leaderBoard_h2.textContent = "All players";

    if (sortedUsers.length !== 0) {
        for (let i = 0; i < sortedUsers.length ; i++ ){
            const leaderBoard_list = document.createElement("div");
            leaderBoard_list.classList.add("leaderboard_list");
            leaderBoard_container.append(leaderBoard_list)
        
            leaderBoard_list.innerHTML += `
                <div class = "the_resttop">
                    <h2>${i+1}</h2>
                    <img class="profilePic_users" src="${sortedUsers[i].profileImg}">
                    <p class= name>${sortedUsers[i].username}</p>
                </div>
        
                <div class="user_content">
                    <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                    <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
                    </svg>
                    <p class="userPoints">${sortedUsers[i].score}</p>
        
                </div>
                `
        }
    } else {
        const currentUser = JSON.parse(sessionStorage.getItem("user"));
        const leaderBoard_list = document.createElement("div");
        leaderBoard_list.classList.add("leaderboard_list");
        leaderBoard_container.append(leaderBoard_list)
        leaderBoard_h2.textContent = "Score";
    
        leaderBoard_list.innerHTML += `
            <div class = "the_resttop">
                <h2>${1}</h2>
                <img class="profilePic_users" src="${currentUser.profileImg}">
                <p class= name>${currentUser.username}</p>
            </div>
    
            <div class="user_content">
                <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
                </svg>
                <p class="userPoints">${singleplayerPoints}</p>
    
            </div>
            `
            updateScore(singleplayerPoints);
    }

    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    for (let user of sortedUsers) {
        if (user.id === currentUser.id) {
            updateScore(user.score);
        }
    }


}
async function updateScore (newScore) {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    
    if (currentUser.totalScore !== 0) {
        currentUser.totalScore = currentUser.totalScore + newScore
    } else {
        currentUser.totalScore = newScore;
    }

    const request = new Request("/api/edit", {
        method: "PATCH",
        headers: {"Content-Type": "application-json"},
        body: JSON.stringify(currentUser)
    });
    const response = await fetch(request);
    if (response.ok) {
        const updatedUser = await response.json();
        sessionStorage.setItem("user", JSON.stringify(updatedUser))
    } else {
        console.log("error");
    }
}







  

//   renderQuizpageContainer("wrapper")