let questionInterval;
let progressBarInterval;

let currentGame;
let points = 0;
let blockUsed = false;

let blockedUsers = new Set();

const gameSocket = new WebSocket("http://localhost:8000");

gameSocket.addEventListener("open", (event) => {
    console.log("connected");
});

gameSocket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);

    if (message.event === "updatePoints") {
        currentGame = message.data;
    }

    if (message.event === "blockUser") {
        const currentUser = JSON.parse(sessionStorage.getItem("user"));
        if (currentUser.id === message.data.id) {
            blockedUsers.add(currentUser);
            blocked(blockedUsers, currentUser);
        }
    }
});

gameSocket.addEventListener("close", (event) => {
    console.log("disconnected");
})

function renderQuizpageContent(parentId, mediaId, mediaType, mode = "singleplayer") {
    const parent = document.getElementById(parentId);
    if (!parent) {
        console.error(`Parent element with id "${parentId}" not found.`);
        return;
    }
    parent.innerHTML = "";

    const quizpageWrapper = document.createElement("div");
    quizpageWrapper.id = "quizpageWrapper";
    parent.append(quizpageWrapper);
    
    renderProfileWithBackArrow(quizpageWrapper.id);
       
    const contentElement = document.createElement("div");
    contentElement.id = "quizpageContent";
    quizpageWrapper.append(contentElement);
   
    let allMedia = [];
    let media = [];
    if (mediaType === "series") {
        allMedia = State.get("quizseries");
        media = State.get("series");
    } else if (mediaType === "films") {
        allMedia = State.get("quizfilms");
        media = State.get("films");
    }

    const selectedMedia = allMedia.find(media => media.id === mediaId);

    if (!selectedMedia) {
        console.error("Media not found");
        return;
    }

    let chosenMedia;
    for (let i = 0; i < media.length; i++) {
        if (selectedMedia.id === media[i].id) {
            chosenMedia = media[i];
        }
    }

    contentElement.innerHTML = `
        <div id="movie_name">    
            <h1 class="quizpageTitle">${selectedMedia.title}</h1>
        </div>
        <div id="quiz_content">
            <img id="movie_img" src="${chosenMedia.image}">
            <div id="superPowerContainer">
                <div id="superPower">
                    <p>&#129668;</p>
                </div>
                <div id="superPowerMenu">
                    <div id="DoublePoints"><p>x2</p></div>
                    <div id="Stop"><p>🤚🏼</p></div>
                </div>
            </div>
            <div id="progress_bar"><div class="progress"></div></div>
            <div id="question_content">
                <p id="question_counter">Question 1/${selectedMedia.questions.length}</p>
                <p id="question">${selectedMedia.questions[0].question}</p>
            </div>
            <div id="answers_box"></div>
        </div>
    `;

    if (mode === "singleplayer") {
        document.getElementById("superPowerContainer").style.visibility = "hidden";
    }

    //make the user unable to enter their profile during a quiz
    document.getElementById("profilePic").style.pointerEvents = "none";

    const superPower = document.getElementById("superPower");
    const superPowerMenu = document.getElementById("superPowerMenu");

    const blockFriend = document.getElementById("Stop");

    superPower.addEventListener("click", () => {
        const isShown = superPowerMenu.classList.toggle("show");
        //old color 6D6D6D
        superPower.style.backgroundColor = isShown ? "#B10A12" : "#E50913";
        superPowerMenu.style.visibility = isShown ? "visible" : "hidden";
    });

    blockFriend.addEventListener("click", ()=>{
        renderBlockPopup("wrapper", currentGame.players);
    })

    let currentQuestionIndex = 0;

    function renderNextQuestion() {
        blockedUsers.clear();
        if (currentQuestionIndex >= selectedMedia.questions.length) {
            clearInterval(questionInterval);
            //potential bug
            clearInterval(progressBarInterval);
            renderLeaderboardpageContainer(parentId, currentGame, points);
  
            points = 0;
            updateCurrentGame(null);
            return;
        }

        const question = selectedMedia.questions[currentQuestionIndex];
        renderQuestion(question);
        
        const questionCounter = document.getElementById("question_counter");
        questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${selectedMedia.questions.length}`;
        
        resetAndStartProgressBar();
        currentQuestionIndex++;
    }

    function renderQuestion(question) {
        const questionText = document.getElementById("question");
        const answersBox = document.getElementById("answers_box");

        questionText.textContent = question.question;
        answersBox.innerHTML = "";

        renderAnswers(answersBox, question.options, question.answer);
    }

    function renderAnswers(parent, answers = [], correctAnswer) {

        const player = JSON.parse(sessionStorage.getItem("user"));
        document.getElementById("DoublePoints").addEventListener("click", (event) => {
            if (!document.getElementById("DoublePoints").classList.contains("used")) {
                document.getElementById("DoublePoints").classList.add("double");
            }
        });

        answers.forEach(answerText => {

            const newElement = document.createElement("div");
            newElement.classList.add("answer");
            
            const answer = document.createElement("p");
            answer.textContent = answerText;
            
            newElement.addEventListener("click", () => {
                const allAnswers = parent.querySelectorAll(".answer");
                allAnswers.forEach(answerDiv => answerDiv.style.pointerEvents = "none");
                
                newElement.classList.add("selectedAnswer");
                if (answer.textContent === correctAnswer && document.getElementById("DoublePoints").classList.contains("double")) {
                    document.getElementById("DoublePoints").classList.remove("double");
                    document.getElementById("DoublePoints").classList.add("used");
                    document.getElementById("DoublePoints").style.backgroundColor = "rgb(103, 103, 103)";
                    points = points + 20;
                    updatePoints(points, player);

                    if (mode === "multiplayer") {
                        const message = JSON.stringify({event: "updatePoints", data: {user: player, game: currentGame}});
                        gameSocket.send(message);
                    }
                } else if (answer.textContent === correctAnswer && !document.getElementById("DoublePoints").classList.contains("double")) {
                    points = points + 10;
                    updatePoints(points, player);
                    if (mode === "multiplayer") {
                        const message = JSON.stringify({event: "updatePoints", data: {user: player, game: currentGame}});
                        gameSocket.send(message);
                    }
                }
            });
            
            if (document.getElementById("DoublePoints").classList.contains("used")) {
                document.getElementById("DoublePoints").style.backgroundColor = "rgb(103, 103, 103)";
            }
            
            newElement.append(answer);
            parent.append(newElement);
        });
    }

    function resetAndStartProgressBar() {
        const progressBar = document.querySelector("#progress_bar .progress");
        progressBar.style.transition = "none";
        progressBar.style.width = "0%";

        setTimeout(() => {
            progressBar.style.transition = "width 15s linear";
            progressBar.style.width = "100%";
        }, 50);

        clearInterval(progressBarInterval);
    }

    renderNextQuestion();
    questionInterval = setInterval(renderNextQuestion, 15000);
}

function renderLeavequizPopup(parentId) {
    const parent = document.getElementById(parentId);
    if (!parent) return;

    const background = document.createElement("div");
    background.classList.add("popupBackground");
    parent.appendChild(background);

    const popup = document.createElement("div");
    if (currentGame) {
        popup.id = "leaveQuiz";
        popup.innerHTML = `
            <button class="closePopupQuizpage">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path d="M11.1732 9.49899L18.649 2.03423C18.8724 1.81075 18.998 1.50766 18.998 1.19162C18.998 0.875585 18.8724 0.572491 18.649 0.349018C18.4255 0.125546 18.1225 0 17.8065 0C17.4905 0 17.1874 0.125546 16.964 0.349018L9.5 7.82565L2.03603 0.349018C1.81259 0.125546 1.50952 2.80593e-07 1.19352 2.82947e-07C0.877516 2.85302e-07 0.574455 0.125546 0.351006 0.349018C0.127557 0.572491 0.00202541 0.875585 0.0020254 1.19162C0.0020254 1.50766 0.127557 1.81075 0.351006 2.03423L7.82684 9.49899L0.351006 16.9637C0.239784 17.0741 0.151505 17.2053 0.0912611 17.35C0.031017 17.4946 0 17.6497 0 17.8064C0 17.963 0.031017 18.1181 0.0912611 18.2628C0.151505 18.4074 0.239784 18.5386 0.351006 18.649C0.46132 18.7602 0.592563 18.8485 0.737166 18.9087C0.881769 18.969 1.03687 19 1.19352 19C1.35017 19 1.50527 18.969 1.64987 18.9087C1.79448 18.8485 1.92572 18.7602 2.03603 18.649L9.5 11.1723L16.964 18.649C17.0743 18.7602 17.2055 18.8485 17.3501 18.9087C17.4947 18.969 17.6498 19 17.8065 19C17.9631 19 18.1182 18.969 18.2628 18.9087C18.4074 18.8485 18.5387 18.7602 18.649 18.649C18.7602 18.5386 18.8485 18.4074 18.9087 18.2628C18.969 18.1181 19 17.963 19 17.8064C19 17.6497 18.969 17.4946 18.9087 17.35C18.8485 17.2053 18.7602 17.0741 18.649 16.9637L11.1732 9.49899Z" fill="white"/>
                </svg>
            </button>
            <div id="LeavequizPopupContent">
                <p id="leaveQuizText">You can't leave a multiplayer game</p>
            </div>
        `;
    } else {
        popup.id = "leaveQuiz";
        popup.innerHTML = `
            <button class="closePopupQuizpage">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path d="M11.1732 9.49899L18.649 2.03423C18.8724 1.81075 18.998 1.50766 18.998 1.19162C18.998 0.875585 18.8724 0.572491 18.649 0.349018C18.4255 0.125546 18.1225 0 17.8065 0C17.4905 0 17.1874 0.125546 16.964 0.349018L9.5 7.82565L2.03603 0.349018C1.81259 0.125546 1.50952 2.80593e-07 1.19352 2.82947e-07C0.877516 2.85302e-07 0.574455 0.125546 0.351006 0.349018C0.127557 0.572491 0.00202541 0.875585 0.0020254 1.19162C0.0020254 1.50766 0.127557 1.81075 0.351006 2.03423L7.82684 9.49899L0.351006 16.9637C0.239784 17.0741 0.151505 17.2053 0.0912611 17.35C0.031017 17.4946 0 17.6497 0 17.8064C0 17.963 0.031017 18.1181 0.0912611 18.2628C0.151505 18.4074 0.239784 18.5386 0.351006 18.649C0.46132 18.7602 0.592563 18.8485 0.737166 18.9087C0.881769 18.969 1.03687 19 1.19352 19C1.35017 19 1.50527 18.969 1.64987 18.9087C1.79448 18.8485 1.92572 18.7602 2.03603 18.649L9.5 11.1723L16.964 18.649C17.0743 18.7602 17.2055 18.8485 17.3501 18.9087C17.4947 18.969 17.6498 19 17.8065 19C17.9631 19 18.1182 18.969 18.2628 18.9087C18.4074 18.8485 18.5387 18.7602 18.649 18.649C18.7602 18.5386 18.8485 18.4074 18.9087 18.2628C18.969 18.1181 19 17.963 19 17.8064C19 17.6497 18.969 17.4946 18.9087 17.35C18.8485 17.2053 18.7602 17.0741 18.649 16.9637L11.1732 9.49899Z" fill="white"/>
                </svg>
            </button>
            <div id="LeavequizPopupContent">
                <p id="leaveQuizText">Are you sure you want to exit the quiz?</p>
                <div id="Options">
                    <button id="leaveQuizYes">Yes</button>
                    <button id="dontLeave">No</button>
                </div>
            </div>
        `;
    }
    parent.appendChild(popup);

    document.querySelector(".closePopupQuizpage").addEventListener("click", () => {
        parent.removeChild(popup);
        parent.removeChild(background);
    });

    document.getElementById("leaveQuizYes").addEventListener("click", () => {
        points = 0;
        updateCurrentGame(null);
        clearInterval(questionInterval);
        renderLandingpageWrapper("wrapper");
    });

    document.getElementById("dontLeave").addEventListener("click", () => {
        parent.removeChild(popup);
        parent.removeChild(background);
    });
}

function updatePoints (points, player) {
    player.score = points;
}

function updateCurrentGame (game) {
    currentGame = game;
}

function renderBlockPopup(parentId,userData){
    const parent = document.getElementById(parentId);

    const background = document.createElement("div");
    background.classList.add("popupBackground");
    parent.appendChild(background);

    const popup = document.createElement("div");
    popup.id = "blockList";
    popup.innerHTML += `
        <button class="closeBlockPopup">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path d="M11.1732 9.49899L18.649 2.03423C18.8724 1.81075 18.998 1.50766 18.998 1.19162C18.998 0.875585 18.8724 0.572491 18.649 0.349018C18.4255 0.125546 18.1225 0 17.8065 0C17.4905 0 17.1874 0.125546 16.964 0.349018L9.5 7.82565L2.03603 0.349018C1.81259 0.125546 1.50952 2.80593e-07 1.19352 2.82947e-07C0.877516 2.85302e-07 0.574455 0.125546 0.351006 0.349018C0.127557 0.572491 0.00202541 0.875585 0.0020254 1.19162C0.0020254 1.50766 0.127557 1.81075 0.351006 2.03423L7.82684 9.49899L0.351006 16.9637C0.239784 17.0741 0.151505 17.2053 0.0912611 17.35C0.031017 17.4946 0 17.6497 0 17.8064C0 17.963 0.031017 18.1181 0.0912611 18.2628C0.151505 18.4074 0.239784 18.5386 0.351006 18.649C0.46132 18.7602 0.592563 18.8485 0.737166 18.9087C0.881769 18.969 1.03687 19 1.19352 19C1.35017 19 1.50527 18.969 1.64987 18.9087C1.79448 18.8485 1.92572 18.7602 2.03603 18.649L9.5 11.1723L16.964 18.649C17.0743 18.7602 17.2055 18.8485 17.3501 18.9087C17.4947 18.969 17.6498 19 17.8065 19C17.9631 19 18.1182 18.969 18.2628 18.9087C18.4074 18.8485 18.5387 18.7602 18.649 18.649C18.7602 18.5386 18.8485 18.4074 18.9087 18.2628C18.969 18.1181 19 17.963 19 17.8064C19 17.6497 18.969 17.4946 18.9087 17.35C18.8485 17.2053 18.7602 17.0741 18.649 16.9637L11.1732 9.49899Z" fill="white"/>
            </svg>
        </button>
        <div id ="blockContent"></div>
        `;
    parent.appendChild(popup);

    renderSearchbarquizpage("blockContent");
    renderPopupUserData("blockContent", userData);
    attachUserBoxEventListeners();

    document.querySelector("#blockContent").innerHTML += `<button id = "blockButton"> Block </button>`;

    document.getElementById("blockButton").addEventListener("click", (event) => {
        const userToBlock = document.querySelector(".blockThisUser");
        const name = userToBlock.querySelector(".name").textContent;

        if (!blockUsed) {
            const message = JSON.stringify({event: "blockUser", data: name});
            gameSocket.send(message);

            document.getElementById("Stop").style.backgroundColor = "rgb(103, 103, 103)";
            document.getElementById("Stop").style.pointerEvents = "none";
            blockUsed = true;
            parent.removeChild(popup);
            parent.removeChild(background);
        }
    })

    const closeBlockPopup = document.querySelector(".closeBlockPopup");
    closeBlockPopup.addEventListener("click", ()=>{
        parent.removeChild(popup);
        parent.removeChild(background);
    })

    const usersBox = document.querySelectorAll(".blockUsersBox") 
    usersBox.forEach((box) => {
        box.addEventListener("click", () => {
            document.querySelectorAll(".blockUsersBox.blockThisUser").forEach((activeBox) => {
                activeBox.classList.remove("blockThisUser");
                activeBox.style.pointerEvents = "auto"; 
            });
    
            box.classList.add("blockThisUser");
            box.style.pointerEvents = "none";
        });
    });
}

function attachUserBoxEventListeners() {
    document.getElementById("UsersListContainer").addEventListener("click", (event) => {
        const box = event.target.closest(".blockUsersBox");
        if (box) {
            document.querySelectorAll(".blockUsersBox.blockThisUser").forEach((activeBox) => {
                activeBox.classList.remove("blockThisUser");
                activeBox.style.pointerEvents = "auto";
            });
    
            box.classList.add("blockThisUser");
            box.style.pointerEvents = "none";
        }
    });
}

function renderPopupUserData(parentId, userData){
    
    const parent = document.getElementById(parentId);

    let userDataCopy = userData.slice();
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    for (let i = 0; i < userDataCopy.length; i++) {
        if (userDataCopy[i].user.id === currentUser.id) {
            userDataCopy.splice(i, 1);
        }
    }

    if (!Array.isArray(userData)) {
        console.error("Invalid userData. Expected an array.");
        return;
    }

    let UsersListContainer = document.getElementById("UsersListContainer");
    if (!UsersListContainer) {
        UsersListContainer = document.createElement("div");
        UsersListContainer.id = "UsersListContainer";
        parent.appendChild(UsersListContainer);
    }

    UsersListContainer.innerHTML = "";

    userDataCopy.forEach((user) => {
        attachUserBoxEventListeners();
        const blockUsersBox = document.createElement("div");
        blockUsersBox.className = "blockUsersBox";
        blockUsersBox.setAttribute("dataUserId", user.id);
        UsersListContainer.appendChild(blockUsersBox);

        blockUsersBox.innerHTML = `
            <div class="blockUsers">
                <img class="profilePic_users" src="${user.user.profileImg}" alt="${user.user.username}'s profile picture">
                <p class="name">${user.user.username}</p>
            </div>
            <div class="user_content">
                <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                    <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
                </svg>
                <p class="userPoints">${user.user.score}</p>
            </div>`;     
    });

}

function renderSearchbarquizpage(parentId) {
    const parent = document.getElementById(parentId);

    const Container = document.createElement("div");
    Container.id = "FirstContainer";

    
    const title = document.createElement("p");
    title.id = "blockTitle";
    title.textContent = "Block a friend"
    Container.append(title);

    const searchBlockContainer = document.createElement("div");
    searchBlockContainer.id = "searchBlockContainer";

    const searchbar = document.createElement("input");
    searchbar.type = "text";
    searchbar.placeholder = "Search";
    searchbar.id = "searchBarBlock";
    searchBlockContainer.appendChild(searchbar);

    const searchButton = document.createElement("button");
    searchButton.id = "searchButton";
    searchButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M15.7372 14.4753L12.7159 11.463C13.6907 10.2211 14.2196 8.68756 14.2176 7.10882C14.2176 5.70283 13.8007 4.32841 13.0196 3.15937C12.2385 1.99033 11.1282 1.07918 9.82925 0.54113C8.53028 0.00308012 7.10094 -0.137698 5.72196 0.136597C4.34299 0.410893 3.07631 1.08794 2.08213 2.08213C1.08794 3.07631 0.410893 4.34299 0.136597 5.72196C-0.137698 7.10094 0.00308012 8.53028 0.54113 9.82925C1.07918 11.1282 1.99033 12.2385 3.15937 13.0196C4.32841 13.8007 5.70283 14.2176 7.10882 14.2176C8.68756 14.2196 10.2211 13.6907 11.463 12.7159L14.4753 15.7372C14.5579 15.8204 14.6562 15.8865 14.7645 15.9317C14.8728 15.9768 14.9889 16 15.1062 16C15.2236 16 15.3397 15.9768 15.448 15.9317C15.5563 15.8865 15.6545 15.8204 15.7372 15.7372C15.8204 15.6545 15.8865 15.5563 15.9317 15.448C15.9768 15.3397 16 15.2236 16 15.1062C16 14.9889 15.9768 14.8728 15.9317 14.7645C15.8865 14.6562 15.8204 14.5579 15.7372 14.4753ZM1.77721 7.10882C1.77721 6.05433 2.0899 5.02352 2.67575 4.14674C3.26159 3.26996 4.09428 2.58659 5.0685 2.18305C6.04273 1.77952 7.11474 1.67393 8.14897 1.87965C9.1832 2.08538 10.1332 2.59316 10.8788 3.3388C11.6245 4.08444 12.1323 5.03444 12.338 6.06868C12.5437 7.10291 12.4381 8.17492 12.0346 9.14914C11.6311 10.1234 10.9477 10.9561 10.0709 11.5419C9.19413 12.1277 8.16332 12.4404 7.10882 12.4404C5.69479 12.4404 4.33867 11.8787 3.3388 10.8788C2.33893 9.87897 1.77721 8.52285 1.77721 7.10882Z" fill="white"/>
        </svg>
    `;
    searchBlockContainer.appendChild(searchButton);
    Container.appendChild(searchBlockContainer);

    parent.appendChild(Container);

    parent.addEventListener("keyup", function (event) {
        if (event.target && event.target.id === "searchBarBlock") {
            const players = currentGame.players;
            const search = event.target.value;

            const foundUsers = searchUser(search, players);
            renderPopupUserData("blockContent", foundUsers);
        }
    })
} 

function blocked (blockedUsers, currentUser) {
    for (let user of blockedUsers) {
        if (user.id === currentUser.id) {
            const answersBox = document.getElementById("answers_box");
            const answers = answersBox.querySelectorAll(".answer");
        
            answers.forEach((answer) => {
                answer.style.pointerEvents = "none";
                answer.style.opacity = "0.5"; 
            });
        }
    }
}   