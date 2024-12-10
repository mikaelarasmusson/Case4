function renderQuizpageContainer(parentId) {
    // Get the parent element
    const parent = document.getElementById(parentId);

    const quiz_page_wrapper = document.createElement("div");
    quiz_page_wrapper.id = "quizpage_wrapper";
    parent.append(quiz_page_wrapper)

    // Clear the parent element's content
    parent.innerHTML = "";
  
    // Create a new container element
    const container = document.createElement("div");
    container.id = "quizpageContainer"; 
  
    // Append the container to the parent element
    parent.append(quiz_page_wrapper);
    quiz_page_wrapper.append(container)
    document.querySelector("body").style.backgroundImage = "none"
    document.querySelector("body").style.backgroundColor = "black"

    // Render the landing page content inside the container
    renderProfile(container.id);
    renderQuizpageContent(container.id);
    
  }



  function renderQuizpageContent(parentId) {
    // Get the parent element
    const parent = document.getElementById(parentId);
  
    // Create a new content element
    const contentElement = document.createElement("div");
    contentElement.id = "quizpageContent";
    contentElement.classList.add("quizpage");
  
    contentElement.innerHTML = `
      <div id="movie_name">    
        <h1 class="landingpageTitle">The Lord of the Rings</h1>
      </div>
  
      <div id="quiz_content">
        <img id="movie_img">
        <div id="timer">
          <svg width="18" height="25" viewBox="0 0 22 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_579_34)">
          <path d="M17.9588 7.60795C17.925 7.54224 17.8724 7.48684 17.8068 7.44809C17.7413 7.40933 17.6655 7.38879 17.5882 7.38881H13.2977L16.7251 0.555211C16.7548 0.495947 16.7682 0.430533 16.764 0.365061C16.7598 0.29959 16.7381 0.236191 16.701 0.18077C16.6638 0.125349 16.6124 0.0797091 16.5516 0.0481012C16.4907 0.0164933 16.4224 -5.41829e-05 16.3529 1.33287e-07H9.76473C9.68531 -1.15145e-05 9.60757 0.021672 9.5409 0.0624369C9.47423 0.103202 9.42146 0.161308 9.38896 0.229753L4.03605 11.5074C4.00793 11.5666 3.99595 11.6316 4.00121 11.6963C4.00646 11.761 4.02879 11.8235 4.06614 11.8779C4.1035 11.9324 4.15471 11.9772 4.21508 12.0082C4.27546 12.0392 4.3431 12.0554 4.41183 12.0554H8.43029L6.48007 20.5281C6.46018 20.6141 6.47175 20.7039 6.51289 20.7828C6.55404 20.8618 6.62232 20.9252 6.70658 20.9628C6.79084 21.0004 6.8861 21.0098 6.97679 20.9896C7.06748 20.9694 7.14824 20.9208 7.20588 20.8517L17.9117 8.01846C17.9595 7.96108 17.9893 7.89217 17.9976 7.81959C18.0059 7.747 17.9925 7.67366 17.9588 7.60795Z" fill="white"/>
          </g>
          <defs>
          <filter id="filter0_d_579_34" x="0" y="0" width="22" height="29" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_579_34"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_579_34" result="shape"/>
          </filter>
          </defs>
          </svg>

        </div>
        <div id= "question_content">
          <p id = "question_counter">Question 7/23 </p>
          <p id= "question">In which year was 'Inception' released?</p>
        </div>
        <div id="answers_box">

        </div>
      </div>  
    `;

    const movieImg = contentElement.querySelector("#movie_img");
    movieImg.src = "../../images/inception.jpg"; 
  
    // Append the content element to the parent element
    parent.append(contentElement);
    
    renderAnswers("answers_box", ["James Camero", "2005", "2008", "2015"]);

  }
  

  function renderAnswers(parentId, answers = []) {
    // Get the parent element
    const parent = document.getElementById(parentId);
    
    // Check if the parent exists
  if (!parent) {
    console.error(`Parent with id "${parentId}" not found.`);
    return;
  }

    // Loop through the provided answers array
    answers.forEach(answerText => {
      const newElement = document.createElement("div"); 
      newElement.classList.add("answer"); 

       // Add the letter with the answer
   
  
      const answer = document.createElement("p"); 
      answer.textContent = answerText; 
      newElement.append(answer); 
  
      // Append the answer element to the parent element
      parent.append(newElement); 
    });
  }

      
  

  renderQuizpageContainer("wrapper")