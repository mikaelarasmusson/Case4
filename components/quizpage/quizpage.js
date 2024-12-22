let questionInterval; // إعلان المتغير بشكل عام

let currentGame;
let points = 0;

const gameSocket = new WebSocket("http://localhost:8000");

gameSocket.addEventListener("open", (event) => {
    console.log("connected");
});

gameSocket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);

    if (message.event === "updatePoints") {
        currentGame = message.data;
        console.log(currentGame);
        //vet inte ens om den behöver returnera något men den måste uppdatera spelarobjektet kanske kan skicka tillbaka det och spara det i en variabel
        //som sedan skickas till leaderboarden?
    }

    if (message.event === "blockPoints") {
        //do something
    }
});

gameSocket.addEventListener("close", (event) => {
    console.log("disconnected");
})

function renderQuizpageContent(parentId, mediaId, mode = "singleplayer") {
    console.log(mediaId);
    console.log(mode);
    const parent = document.getElementById(parentId);
    if (!parent) {
        console.error(`Parent element with id "${parentId}" not found.`);
        return;
    }
    parent.innerHTML = "";

    // إنشاء المحتوى الرئيسي
    const quizpageWrapper = document.createElement("div");
    quizpageWrapper.id = "quizpageWrapper";
    parent.append(quizpageWrapper);
    
    renderProfileWithBackArrow(quizpageWrapper.id);
       
    const contentElement = document.createElement("div");
    contentElement.id = "quizpageContent";
    quizpageWrapper.append(contentElement);
   
    // جلب الـ media من الـ State
    const allMedia = [...State.get("quizfilms"), ...State.get("quizseries")];
    const selectedMedia = allMedia.find(media => media.id === mediaId);

    if (!selectedMedia) {
        console.error("Media not found");
        return;
    }

    contentElement.innerHTML = `
        <div id="movie_name">    
            <h1 class="leaderboardpageTitle">${selectedMedia.title}</h1>
        </div>
        <div id="quiz_content">
            <img id="movie_img" src="${selectedMedia.image}">
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

    // إظهار/إخفاء قائمة الـ super power
    const superPower = document.getElementById("superPower");
    const superPowerMenu = document.getElementById("superPowerMenu");

    superPower.addEventListener("click", () => {
        const isShown = superPowerMenu.classList.toggle("show");
        superPower.style.backgroundColor = isShown ? "#676767" : "#E50913";
        superPowerMenu.style.visibility = isShown ? "visible" : "hidden";
    });

    let currentQuestionIndex = 0;

    function renderNextQuestion() {
        if (currentQuestionIndex >= selectedMedia.questions.length) {
            clearInterval(questionInterval);
            renderLeaderboardpageContainer(parentId, currentGame);
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
                    points = points + 20;
                    updatePoints(points, player);

                    if (mode === "multiplayer") {
                        const message = JSON.stringify({event: "updatePoints", data: {user: player, game: currentGame}})
                        gameSocket.send(message);
                    }
                } else if (answer.textContent === correctAnswer && !document.getElementById("DoublePoints").classList.contains("double")) {
                    points = points + 10;
                    updatePoints(points, player);
                    if (mode === "multiplayer") {
                        const message = JSON.stringify({event: "updatePoints", data: {user: player, game: currentGame}})
                        gameSocket.send(message);
                    }
                }
            });

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
        }, 10);
    }

    renderNextQuestion();
    questionInterval = setInterval(renderNextQuestion, 15000);
}

function renderLeavequizPopup(parentId) {
    const parent = document.getElementById(parentId);
    if (!parent) return;

    const background = document.createElement("div");
    background.id = "popupBackground";
    parent.appendChild(background);

    const popup = document.createElement("div");
    popup.id = "leaveQuiz";
    popup.innerHTML = `
        <button id="closeLeavequizPopup">
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
    parent.appendChild(popup);

    document.getElementById("closeLeavequizPopup").addEventListener("click", () => {
        parent.removeChild(popup);
        parent.removeChild(background);
    });

    document.getElementById("leaveQuizYes").addEventListener("click", () => {
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
    console.log(currentGame);
}


//om man klickar på double points ska poängen vara värda dubbelt så mycket