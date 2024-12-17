function renderQuizpageContent(parentId, mediaId) {
    const parent = document.getElementById(parentId);
    parent.innerHTML = "";

    // Create a new content element
    const quizpageWrapper = document.createElement("div");
    quizpageWrapper.id = "quizpageWrapper";
    parent.append(quizpageWrapper);
    
    renderProfileWithBackArrow(quizpageWrapper.id);

    
       
    // Create a new content element
    const contentElement = document.createElement("div");
    contentElement.id = "quizpageContent";
    quizpageWrapper.append(contentElement);


   
    // Find the selected media based on mediaId
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
            <img id="movie_img" src="${selectedMedia.image}" >
            <div id= "superPowerContainer">
                <div id="superPower">
                    <p>&#129668;</p>
                </div>
                <!-- Here is the hidden menu that will appear on click -->
                <div id="superPowerMenu">
                    <div id="DoublePoints">
                        <p>x2</p>
                    </div>
                    <div id="Stop">
                        <p>🤚🏼</p>
                    </div>
                </div>
            </div>
            <div id="progress_bar">
                <div class="progress"></div>
            </div> 
            <div id="question_content">
                <p id="question_counter">Question 1/${selectedMedia.questions.length}</p>
                <p id="question">${selectedMedia.questions[0].question}</p>
            </div>
            <div id="answers_box"></div>
        </div>
    `;

    // Add click event to show/hide the menu
    const superPower = document.getElementById("superPower");
    const superPowerMenu = document.getElementById("superPowerMenu");
    
    superPower.addEventListener("click", function() {
        if (superPowerMenu.classList.contains("show")) {
            superPower.style.backgroundColor = "#E50913";
            superPowerMenu.classList.remove("show");
            setTimeout(() => {
                superPowerMenu.style.visibility = "hidden";
            }, 400); 

        } else {
            superPower.style.backgroundColor = "#676767";
            superPowerMenu.style.visibility = "visible";
            superPowerMenu.classList.add("show");
        }
    });

    // Render the first question
    if (selectedMedia.questions && selectedMedia.questions.length > 0) {
        let currentQuestionIndex = 0;  // Start from the first question

        function renderNextQuestion() {
            // If we have reached the end of the questions, stop the interval
            if (currentQuestionIndex >= selectedMedia.questions.length) {
                clearInterval(questionInterval);
                 renderLeaderboardpageContainer(parentId)
                return;
            }

            const question = selectedMedia.questions[currentQuestionIndex];
            renderQuestion(question, selectedMedia.questions.length);
        
            // Update question counter
            const questionCounter = document.getElementById("question_counter");
            questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${selectedMedia.questions.length}`;
        
            // Reset and start the progress bar
            resetAndStartProgressBar();
        
            // Move to the next question
            currentQuestionIndex++;
        }
        
        // Render the first question
         renderNextQuestion();

        // Set interval to change questions every 15 seconds
        const questionInterval = setInterval(renderNextQuestion, 15000);
    }

    function renderQuestion(question, totalQuestions) {
        const questionText = document.getElementById("question");
        const answersBox = document.getElementById("answers_box");
    
        // Check if the question element exists
        if (!questionText) {
            // If the element doesn't exist, create it
            const questionContent = document.getElementById("question_content");
            const newQuestionText = document.createElement("p");
            newQuestionText.id = "question";
            questionContent.appendChild(newQuestionText);
            questionText = newQuestionText;
        }

        // Update the question text
        questionText.textContent = question.question;
    
        // Clear previous answers
        answersBox.innerHTML = "";
    
        // Render the answers for the current question
        renderAnswers(answersBox, question.options, question.answer);
    }

    function renderAnswers(parent, answers = [], correctAnswer) {
        // Check if the parent exists
        if (!parent) {
            console.error(`Parent with id "${parent.id}" not found.`);
            return;
        }

        // Loop through the provided answers array and render them
        answers.forEach(answerText => {
            const newElement = document.createElement("div"); 
            newElement.classList.add("answer");

            const answer = document.createElement("p");
            answer.textContent = answerText;

            // Add a click event to each answer
            newElement.addEventListener("click", function() {
                // Disable all answers after one is selected
                const allAnswers = parent.querySelectorAll(".answer");
                allAnswers.forEach(answerDiv => {
                    answerDiv.style.pointerEvents = "none"; // Disable clicks
                });

                // Highlight the selected answer
                newElement.classList.add( "selectedAnswer")
            });

            newElement.append(answer);
            parent.append(newElement); 
        });
    }

    // Function to reset and start progress bar
    function resetAndStartProgressBar() {
        const progressBar = document.querySelector("#progress_bar .progress");

        // Reset the progress bar
        progressBar.style.transition = "none";
        progressBar.style.width = "0%";

        // Start the progress bar animation
        setTimeout(() => {
            progressBar.style.transition = "width 15s linear";
            progressBar.style.width = "100%";
        }, 10); // Slight delay to ensure reset takes effect
    }

}

function renderLeavequizPopup(parentId){
    const parent = document.getElementById(parentId);

    const background = document.createElement("div");
    background.id = "popupBackground"
    parent.appendChild(background)

    const popup = document.createElement("div");
    popup.id = "leaveQuiz" 

    popup.innerHTML =`
    <button id="closeLeavequizPopup">
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path d="M11.1732 9.49899L18.649 2.03423C18.8724 1.81075 18.998 1.50766 18.998 1.19162C18.998 0.875585 18.8724 0.572491 18.649 0.349018C18.4255 0.125546 18.1225 0 17.8065 0C17.4905 0 17.1874 0.125546 16.964 0.349018L9.5 7.82565L2.03603 0.349018C1.81259 0.125546 1.50952 2.80593e-07 1.19352 2.82947e-07C0.877516 2.85302e-07 0.574455 0.125546 0.351006 0.349018C0.127557 0.572491 0.00202541 0.875585 0.0020254 1.19162C0.0020254 1.50766 0.127557 1.81075 0.351006 2.03423L7.82684 9.49899L0.351006 16.9637C0.239784 17.0741 0.151505 17.2053 0.0912611 17.35C0.031017 17.4946 0 17.6497 0 17.8064C0 17.963 0.031017 18.1181 0.0912611 18.2628C0.151505 18.4074 0.239784 18.5386 0.351006 18.649C0.46132 18.7602 0.592563 18.8485 0.737166 18.9087C0.881769 18.969 1.03687 19 1.19352 19C1.35017 19 1.50527 18.969 1.64987 18.9087C1.79448 18.8485 1.92572 18.7602 2.03603 18.649L9.5 11.1723L16.964 18.649C17.0743 18.7602 17.2055 18.8485 17.3501 18.9087C17.4947 18.969 17.6498 19 17.8065 19C17.9631 19 18.1182 18.969 18.2628 18.9087C18.4074 18.8485 18.5387 18.7602 18.649 18.649C18.7602 18.5386 18.8485 18.4074 18.9087 18.2628C18.969 18.1181 19 17.963 19 17.8064C19 17.6497 18.969 17.4946 18.9087 17.35C18.8485 17.2053 18.7602 17.0741 18.649 16.9637L11.1732 9.49899Z" fill="white"/>
        </svg>
    </button>

    <div id = "LeavequizPopupContent">
        <p id="leaveQuizText">Are you sure you want to exit the quiz?</p>
        <div id = "Options">
            <button id= "leaveQuizYes">Yes</button>
            <button id="dontLeave">No</button>
        </div>
    </div>
    `
    parent.appendChild(popup);

    const closeButton = document.getElementById("closeLeavequizPopup");
    closeButton.addEventListener("click", () => {
        popup.remove();
        parent.removeChild(background);
    });

    const yesButton = document.getElementById("leaveQuizYes");
    yesButton.addEventListener("click", () => {
        document.getElementById("wrapper").innerHTML = ""
        renderLandingpageWrapper("wrapper");
    });

    const noButton = document.getElementById("dontLeave");
    noButton.addEventListener("click", () => {
        popup.remove();
        parent.removeChild(background);

    });

}
