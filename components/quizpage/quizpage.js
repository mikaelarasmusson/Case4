function renderQuizpageContent(parentId, mediaId) {
    const parent = document.getElementById(parentId);
    parent.innerHTML = "";


    // Create a new content element
    const quizpageWrapper = document.createElement("div");
    quizpageWrapper.id = "quizpageWrapper";
    parent.append(quizpageWrapper);
    
    renderProfileWithBackArrow(quizpageWrapper.id)
       
    // Create a new content element
    const contentElement = document.createElement("div");
    contentElement.id = "quizpageContent";
    quizpageWrapper.append(contentElement)
   
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
                <div id="superPowerMenu" style="display: none;" >
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
        // Toggle the 'show' class to control animation
        superPowerMenu.classList.toggle("show");
    
        // Toggle the background color of the superPower button
        if (superPowerMenu.classList.contains("show")) {
            superPower.style.backgroundColor = "#676767";
            superPowerMenu.style.display = "flex";

        } else {
            
            superPower.style.backgroundColor = "#E50913";
            superPowerMenu.style.display = "none";
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

        // Set interval to change questions every 5 seconds
        const questionInterval = setInterval(renderNextQuestion, 15000);
    }
}

function renderQuestion(question, totalQuestions) {
    const questionText = document.getElementById("question");
    const answersBox = document.getElementById("answers_box");

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
