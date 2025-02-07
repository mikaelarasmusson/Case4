"use strict"
const socket = new WebSocket("http://localhost:8000");

socket.addEventListener("open", (event) => {
    console.log("connected");
});

socket.addEventListener("message", (event) => {

    const message = JSON.parse(event.data);
    if (message.event == "createdGame") {
        renderWaitingRoom("wrapper", message.data);
    }
});

socket.addEventListener("close", (event) => {
    console.log("disconnected");
});

//Container for filterpage
function renderFilterpageContainer(parentId) {
    // Get the parent element
    const parent = document.getElementById(parentId);

    parent.innerHTML = "";
    
    const container = document.createElement("div");
    container.id = "filterpageContainer"; 
    
    parent.append(container);
        
    renderProfileWithBackArrow(container.id);
    renderSearchbar(container.id);
    renderFilterContainer(container.id);
    renderFilmsandSeriesBoxesContainer(container.id);
}

// Profile-header
function renderProfileWithBackArrow(parentId) {
    const parent = document.getElementById(parentId);
  
    const profileContainer = document.createElement("div");
    profileContainer.id = "profileContainerWithBackArrow";
    parent.appendChild(profileContainer);
  
    const profileContent = document.createElement("div");
    profileContent.id = "profileContentWithBackArrow";
    profileContent.classList.add("profile");

    let userInfo = State.get("users");
    const user = JSON.parse(sessionStorage.getItem("user"));
    
    profileContent.innerHTML = `
      <button id="backArrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
            <path d="M9 19.6567L0 10L9 0.343346L11.1 2.67704L5.775 8.39056H24V11.6094H5.775L11.1 17.323L9 19.6567Z" fill="white"/>
        </svg>
      </button>
      <div id="profileCont">
        <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
          <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
        </svg>
        <p id="userPoints">${user.totalScore}</p>
        <img id="profilePic" src="${user.profileImg}">
      </div>
    `;

    profileContainer.appendChild(profileContent);

    document.getElementById("backArrow").addEventListener("click", () => {
        if  (parentId == "quizpageWrapper"){
            renderLeavequizPopup("wrapper")
        }else{
            localStorage.removeItem("gameMode");
            renderLandingpageWrapper("wrapper");
        }
    });

    const profilePic = document.querySelector("#profilePic");
    profilePic.addEventListener("click", () => {
      document.getElementById("wrapper").innerHTML = "";
      renderProfilePageContainer("wrapper");
    });
}

// Searchbar
function renderSearchbar(parentId) {
    const parent = document.getElementById(parentId);

    const searchContainer = document.createElement("div");
    searchContainer.id = "searchContainer";

    const searchbar = document.createElement("input");
    searchbar.type = "text";
    searchbar.placeholder = "Search for films and series...";
    searchbar.id = "searchBar";
    searchContainer.appendChild(searchbar);

    const searchButton = document.createElement("button");
    searchButton.id = "searchButton";
    searchButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M15.7372 14.4753L12.7159 11.463C13.6907 10.2211 14.2196 8.68756 14.2176 7.10882C14.2176 5.70283 13.8007 4.32841 13.0196 3.15937C12.2385 1.99033 11.1282 1.07918 9.82925 0.54113C8.53028 0.00308012 7.10094 -0.137698 5.72196 0.136597C4.34299 0.410893 3.07631 1.08794 2.08213 2.08213C1.08794 3.07631 0.410893 4.34299 0.136597 5.72196C-0.137698 7.10094 0.00308012 8.53028 0.54113 9.82925C1.07918 11.1282 1.99033 12.2385 3.15937 13.0196C4.32841 13.8007 5.70283 14.2176 7.10882 14.2176C8.68756 14.2196 10.2211 13.6907 11.463 12.7159L14.4753 15.7372C14.5579 15.8204 14.6562 15.8865 14.7645 15.9317C14.8728 15.9768 14.9889 16 15.1062 16C15.2236 16 15.3397 15.9768 15.448 15.9317C15.5563 15.8865 15.6545 15.8204 15.7372 15.7372C15.8204 15.6545 15.8865 15.5563 15.9317 15.448C15.9768 15.3397 16 15.2236 16 15.1062C16 14.9889 15.9768 14.8728 15.9317 14.7645C15.8865 14.6562 15.8204 14.5579 15.7372 14.4753ZM1.77721 7.10882C1.77721 6.05433 2.0899 5.02352 2.67575 4.14674C3.26159 3.26996 4.09428 2.58659 5.0685 2.18305C6.04273 1.77952 7.11474 1.67393 8.14897 1.87965C9.1832 2.08538 10.1332 2.59316 10.8788 3.3388C11.6245 4.08444 12.1323 5.03444 12.338 6.06868C12.5437 7.10291 12.4381 8.17492 12.0346 9.14914C11.6311 10.1234 10.9477 10.9561 10.0709 11.5419C9.19413 12.1277 8.16332 12.4404 7.10882 12.4404C5.69479 12.4404 4.33867 11.8787 3.3388 10.8788C2.33893 9.87897 1.77721 8.52285 1.77721 7.10882Z" fill="white"/>
        </svg>
    `;
    searchContainer.appendChild(searchButton);

    parent.appendChild(searchContainer);

    searchbar.addEventListener("keyup", function (event) {

        const media = [...State.get("films"), ...State.get("series")];
        const search = searchbar.value;

        const foundMedia = searchTitle(search, media);
        //ta bort event
        let searchParent = document.getElementById("filmsandSeriesBoxesContainer");
        renderFilmsandSeriesBoxes(searchParent, foundMedia);
    })
} 

let currentFilterType = null; // "films", "series", eller null

// Filter Container
function renderFilterContainer (parentId) {
    const parent = document.getElementById(parentId);
    const container = document.createElement("div");
    container.id = "filterContainer";

    parent.appendChild(container);
    renderFilterContents(container.id);
}

// Update the category text
let selectedCategory = "Categories";

function updateCategoryText (newCategory) {
    selectedCategory = newCategory;
    const categoryButton = document.getElementById("buttonCategories");
    const categoryText = categoryButton.querySelector("p");
    categoryText.textContent = selectedCategory;
}

// Contents for filter
function renderFilterContents(parentId) {
    const parent = document.getElementById(parentId);
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainerFilter";

    const buttonFilms = document.createElement("button");
    buttonFilms.id = "buttonFilms";
    buttonFilms.classList.add("filterpageButton");
    buttonFilms.textContent = "Films";
    buttonContainer.appendChild(buttonFilms);

    const buttonSeries = document.createElement("button");
    buttonSeries.id = "buttonSeries";    
    buttonSeries.classList.add("filterpageButton");
    buttonSeries.textContent = "Series";
    buttonContainer.appendChild(buttonSeries);  

    const buttonCategories = document.createElement("button");
    buttonCategories.id = "buttonCategories";
    buttonCategories.innerHTML = `
        <p>${selectedCategory}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M0 1.6465L1.16788 0.5L8 7.26434L14.8321 0.5L16 1.6465L8 9.5L0 1.6465Z" fill="white"/>
        </svg>
    `;
    buttonContainer.appendChild(buttonCategories);

    parent.appendChild(buttonContainer);

    // Funktion för att visa noFilter-knappen
    function showNoFilterButton() {
        let buttonNoFilter = document.getElementById("buttonNoFilter");
        if (!buttonNoFilter) {
            buttonNoFilter = document.createElement("button");
            buttonNoFilter.id = "buttonNoFilter";
            buttonNoFilter.classList.add("filterpageButton");
            buttonNoFilter.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15.5 2.01607L13.9839 0.5L8 6.48393L2.01607 0.5L0.5 2.01607L6.48393 8L0.5 13.9839L2.01607 15.5L8 9.51607L13.9839 15.5L15.5 13.9839L9.51607 8L15.5 2.01607Z" fill="white"/>
                </svg>
            `;
            buttonContainer.insertBefore(buttonNoFilter, buttonContainer.firstChild);
            buttonNoFilter.classList.add("active");

            // Lägg till klick-hanterare för att gömma knappen
            buttonNoFilter.addEventListener("click", () => {
                hideNoFilterButton();
                buttonFilms.classList.remove("hidden");
                buttonSeries.classList.remove("hidden");
                buttonFilms.style.backgroundColor = "";
                buttonSeries.style.backgroundColor = "";
                buttonCategories.style.backgroundColor = "";

                // Rendera alla filmer och serier
                renderFilmsandSeriesBoxes(
                document.getElementById("filmsandSeriesBoxesContainer")
                );
            });
        }

        buttonNoFilter.classList.add("active"); 
    }

    // Funktion för att gömma noFilter-knappen
    function hideNoFilterButton() {
        const buttonNoFilter = document.getElementById("buttonNoFilter");
        if (buttonNoFilter) {
            buttonNoFilter.classList.remove("active");

            updateCategoryText("Categories");
            currentFilterType = null; // Återställ filtertypen

            setTimeout(() => {
                buttonNoFilter.remove();
            }, 300);
        }
    }

    buttonFilms.addEventListener("click", () => {
        currentFilterType = "films"; // Uppdatera filtertypen
        buttonFilms.style.backgroundColor = "#6D6D6D"; 
        buttonSeries.classList.add("hidden");
        showNoFilterButton();
    
        const selectedCategory = document.getElementById("buttonCategories").querySelector("p").textContent.trim();

        if (selectedCategory !== "Categories") {
            filterAndRenderMediaByGenre(selectedCategory); // Filtrera på kategori och filmer
        } else {
            const films = State.get("films");
            const quizFilms = State.get("quizfilms");
            filterFilmsAndSeriesBoxes(films, quizFilms); // Filtrera endast på filmer
        }
    });
    
    buttonSeries.addEventListener("click", () => {
        currentFilterType = "series"; // Uppdatera filtertypen
        buttonSeries.style.backgroundColor = "#6D6D6D"; 
        buttonFilms.classList.add("hidden");
        showNoFilterButton();
    
        const selectedCategory = document.getElementById("buttonCategories").querySelector("p").textContent.trim();
        
        if (selectedCategory !== "Categories") {
            filterAndRenderMediaByGenre(selectedCategory); // Filtrera på kategori och serier
        } else {
            const series = State.get("series");
            const quizSeries = State.get("quizseries");
            filterFilmsAndSeriesBoxes(series, quizSeries); // Filtrera endast på serier
        }
    });    

    buttonCategories.addEventListener("click", () => {
        buttonCategories.style.backgroundColor = "#6D6D6D"; 
        showNoFilterButton(); 
        renderFilterDropDownPopUp(parentId);
    });
}

// Container for films and series
function renderFilmsandSeriesBoxesContainer(parentId) {
    const parent = document.getElementById(parentId);
    const container = document.createElement("div");
    container.id = "filmsandSeriesBoxesContainer";
    parent.appendChild(container);
    renderFilmsandSeriesBoxes(container);
}
    
// Content of films and series
function renderFilmsandSeriesBoxes(parentDom, mediaList = null) {
    const allMedia = mediaList || [...State.get("films"), ...State.get("series")];
    const quizFilms = State.get("quizfilms");
    const quizSeries = State.get("quizseries");
    parentDom.innerHTML = "";

    for (const media of allMedia) {
        const mediaContent = document.createElement("div");
        mediaContent.id = media.id;
        mediaContent.classList.add("mediaContent");

        const image = document.createElement("img");
        image.src = media.image;
        image.classList.add("mediaImage");
        mediaContent.appendChild(image);

        const title = document.createElement("p");
        title.textContent = media.title;
        title.classList.add("mediaTitle");
        mediaContent.appendChild(title);

        const year = document.createElement("div");
        year.innerHTML = `<p class="mediaYear">(${media.year})</p>`;
        mediaContent.appendChild(year);

        const isFilm = media.type === "films";
        const isSeries = media.type === "series";

        let quizLength;
        const quizData = isFilm ? quizFilms : quizSeries;
        const matchingQuiz = quizData.find((quiz) => quiz.id === media.id);

        if (matchingQuiz) {
            quizLength = matchingQuiz.questions.length;
        } else {
            quizLength = 0;
        }

        const quizLengthText = document.createElement("p");
        quizLengthText.textContent = `${quizLength} questions`;
        quizLengthText.classList.add("mediaQuizLength");
        mediaContent.appendChild(quizLengthText);

        parentDom.appendChild(mediaContent);

        mediaContent.addEventListener("click", () => {
            const mediaType = isFilm ? "films" : isSeries ? "series" : null;
            const gameMode = localStorage.getItem("gameMode");
            const isMultiPlayer = gameMode === "multiplayer";
            const quizPopup = document.getElementById("quizPopup");
            if (quizPopup) {
                quizPopup.remove();
            }
            renderStartQuizPopup(parentDom.id, media.id, mediaType, isMultiPlayer);
        });
    }
}


// Content of films and series
function filterFilmsAndSeriesBoxes (mediaType, quizData) {

    const container = document.getElementById("filmsandSeriesBoxesContainer");
    container.innerHTML = "";

    for (const media of mediaType) {
        const mediaContent = document.createElement("div");
        mediaContent.id = media.id;
        mediaContent.classList.add("mediaContent");

        const image = document.createElement("img");
        image.src = media.image;
        image.classList.add("mediaImage");
        mediaContent.appendChild(image);

        const title = document.createElement("p");
        title.textContent = media.title;
        title.classList.add("mediaTitle");
        mediaContent.appendChild(title);

        const year = document.createElement("div");
        year.innerHTML = `<p class="mediaYear">(${media.year})</p>`;
        mediaContent.appendChild(year);

        let quizLength;
        const matchingQuiz = quizData.find((quiz) => quiz.id === media.id);
        if (matchingQuiz) {
            quizLength = matchingQuiz.questions.length;
        } else {
            quizLength = 0;
        }
        
        const quizLengthText = document.createElement("p");
        quizLengthText.textContent = `${quizLength} questions`;
        quizLengthText.classList.add("mediaQuizLength");
        mediaContent.appendChild(quizLengthText);

        container.appendChild(mediaContent);
    }
}


// Filter by genre
function filterAndRenderMediaByGenre(genre) {
    const allMedia = [...State.get("films"), ...State.get("series")];

    // Filtrera på genre och aktuell filtertyp
    const filteredMedia = allMedia.filter((media) => {
        const matchesGenre = media.genre && media.genre.includes(genre);
        const matchesType = !currentFilterType || media.type === currentFilterType;
        return matchesGenre && matchesType;
    });

    const container = document.getElementById("filmsandSeriesBoxesContainer");
    container.innerHTML = ""; 

    renderFilmsandSeriesBoxes(container, filteredMedia);
}


// Filter popup
function renderFilterDropDownPopUp(parentId) {
    const parent = document.getElementById(parentId);

    if (document.getElementById("categoriesDropdown")) {
        return;
    }

    const categoriesDropdown = document.createElement("div");
    categoriesDropdown.id = "categoriesDropdown";
    categoriesDropdown.innerHTML = `
        <button id="exitDropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path d="M11.1732 9.49899L18.649 2.03423C18.8724 1.81075 18.998 1.50766 18.998 1.19162C18.998 0.875585 18.8724 0.572491 18.649 0.349018C18.4255 0.125546 18.1225 0 17.8065 0C17.4905 0 17.1874 0.125546 16.964 0.349018L9.5 7.82565L2.03603 0.349018C1.81259 0.125546 1.50952 2.80593e-07 1.19352 2.82947e-07C0.877516 2.85302e-07 0.574455 0.125546 0.351006 0.349018C0.127557 0.572491 0.00202541 0.875585 0.0020254 1.19162C0.0020254 1.50766 0.127557 1.81075 0.351006 2.03423L7.82684 9.49899L0.351006 16.9637C0.239784 17.0741 0.151505 17.2053 0.0912611 17.35C0.031017 17.4946 0 17.6497 0 17.8064C0 17.963 0.031017 18.1181 0.0912611 18.2628C0.151505 18.4074 0.239784 18.5386 0.351006 18.649C0.46132 18.7602 0.592563 18.8485 0.737166 18.9087C0.881769 18.969 1.03687 19 1.19352 19C1.35017 19 1.50527 18.969 1.64987 18.9087C1.79448 18.8485 1.92572 18.7602 2.03603 18.649L9.5 11.1723L16.964 18.649C17.0743 18.7602 17.2055 18.8485 17.3501 18.9087C17.4947 18.969 17.6498 19 17.8065 19C17.9631 19 18.1182 18.969 18.2628 18.9087C18.4074 18.8485 18.5387 18.7602 18.649 18.649C18.7602 18.5386 18.8485 18.4074 18.9087 18.2628C18.969 18.1181 19 17.963 19 17.8064C19 17.6497 18.969 17.4946 18.9087 17.35C18.8485 17.2053 18.7602 17.0741 18.649 16.9637L11.1732 9.49899Z" fill="white"/>
            </svg>
        </button>
        <div id="linksContainer">
            <a href="#" class="categoryLink">Action</a>
            <a href="#" class="categoryLink">Adventure</a>
            <a href="#" class="categoryLink">Biography</a>
            <a href="#" class="categoryLink">Comedy</a>
            <a href="#" class="categoryLink">Crime</a>
            <a href="#" class="categoryLink">Drama</a>
            <a href="#" class="categoryLink">Fantasy</a>
            <a href="#" class="categoryLink">History</a>
            <a href="#" class="categoryLink">Horror</a>
            <a href="#" class="categoryLink">Mystery</a>
            <a href="#" class="categoryLink">Romance</a>
            <a href="#" class="categoryLink">Sci-Fi</a>
            <a href="#" class="categoryLink">Sport</a>
            <a href="#" class="categoryLink">Thriller</a> 
        </div>   
    `;

    // Lägg till transition-egenskaper och startposition
    categoriesDropdown.style.transform = "translateY(-100%)";
    categoriesDropdown.style.opacity = "0";
    categoriesDropdown.style.transition = "transform 0.6s ease, opacity 0.6s ease";

    parent.appendChild(categoriesDropdown);

    // Fördröj popup-visning för att initiera transition
    requestAnimationFrame(() => {
        categoriesDropdown.style.transform = "translateY(0)";
        categoriesDropdown.style.opacity = "1";
    });

    // Stäng popup med exit-knappen
    categoriesDropdown.querySelector("#exitDropdown").addEventListener("click", () => closePopup());

    // Stäng popup när en kategori väljs
    const categoryLinks = categoriesDropdown.querySelectorAll(".categoryLink");
    categoryLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const selectedCategory = link.textContent.trim();
            closePopup(() => {
                updateCategoryText(selectedCategory);
                filterAndRenderMediaByGenre(selectedCategory);
            });
        });
    });

    // Funktion för att stänga popupen
    function closePopup(callback) {
        categoriesDropdown.style.transform = "translateY(-100%)";
        categoriesDropdown.style.opacity = "0";
        setTimeout(() => {
            categoriesDropdown.remove();
            if (callback) callback();
        }, 600); // Matcha transition-tiden
    }
}


// Start quiz popup
function renderStartQuizPopup(parentId, mediaId, mediaType, isMultiPlayer) {
    const parent = document.getElementById(parentId);

    let quizData, mediaData;

    if (mediaType === "films") {
        quizData = State.get("quizfilms");
        mediaData = State.get("films");
    } else if (mediaType === "series") {
        quizData = State.get("quizseries");
        mediaData = State.get("series");
    } else {
        console.error("Unknown or invalid media type");
        return;
    }

    const media = mediaData.find((media) => media.id === mediaId);
    if (!media) {
        console.error(`No media found with ID: ${mediaId} in ${mediaType}`);
        return;
    }

    const matchingQuiz = quizData.find((quiz) => quiz.id === media.id);

    if (isMultiPlayer) {
        const popup = document.createElement("div");
        popup.id = "quizPopup";

        popup.innerHTML = `
            <button id="closePopupButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path d="M11.1732 9.49899L18.649 2.03423C18.8724 1.81075 18.998 1.50766 18.998 1.19162C18.998 0.875585 18.8724 0.572491 18.649 0.349018C18.4255 0.125546 18.1225 0 17.8065 0C17.4905 0 17.1874 0.125546 16.964 0.349018L9.5 7.82565L2.03603 0.349018C1.81259 0.125546 1.50952 2.80593e-07 1.19352 2.82947e-07C0.877516 2.85302e-07 0.574455 0.125546 0.351006 0.349018C0.127557 0.572491 0.00202541 0.875585 0.0020254 1.19162C0.0020254 1.50766 0.127557 1.81075 0.351006 2.03423L7.82684 9.49899L0.351006 16.9637C0.239784 17.0741 0.151505 17.2053 0.0912611 17.35C0.031017 17.4946 0 17.6497 0 17.8064C0 17.963 0.031017 18.1181 0.0912611 18.2628C0.151505 18.4074 0.239784 18.5386 0.351006 18.649C0.46132 18.7602 0.592563 18.8485 0.737166 18.9087C0.881769 18.969 1.03687 19 1.19352 19C1.35017 19 1.50527 18.969 1.64987 18.9087C1.79448 18.8485 1.92572 18.7602 2.03603 18.649L9.5 11.1723L16.964 18.649C17.0743 18.7602 17.2055 18.8485 17.3501 18.9087C17.4947 18.969 17.6498 19 17.8065 19C17.9631 19 18.1182 18.969 18.2628 18.9087C18.4074 18.8485 18.5387 18.7602 18.649 18.649C18.7602 18.5386 18.8485 18.4074 18.9087 18.2628C18.969 18.1181 19 17.963 19 17.8064C19 17.6497 18.969 17.4946 18.9087 17.35C18.8485 17.2053 18.7602 17.0741 18.649 16.9637L11.1732 9.49899Z" fill="white"/>
                </svg>
            </button>
            <div id="quizPopupContent">
                <p id="quizPopupMainTitle">Quiz</p>
                <p id="quizPopupMediaTitle">${media.title} (${media.year})</p>
                <p id="quizPopupQuestionCount">${matchingQuiz ? matchingQuiz.questions.length : 0} questions</p>
                <button id="fetchGameButton">Create Game PIN</button>
            </div>
        `;

        parent.appendChild(popup);

        document.getElementById("fetchGameButton").addEventListener("click", () => {
            const user = sessionStorage.getItem("user");
            const json = JSON.parse(user);
            const gameCode = Math.floor(100000 + Math.random() * 900000);
            
            const message = {event: "createdGame", data: {newGameCode: gameCode, host: json}};
            socket.send(JSON.stringify(message));
            sessionStorage.setItem("mediaId", mediaId);
            sessionStorage.setItem("mediaType", mediaType);
        })

        document.getElementById("closePopupButton").addEventListener("click", () => {
            parent.removeChild(popup);
        });

    } else {
        const popup = document.createElement("div");
        popup.id = "quizPopup";

        popup.innerHTML = `
            <button id="closePopupButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path d="M11.1732 9.49899L18.649 2.03423C18.8724 1.81075 18.998 1.50766 18.998 1.19162C18.998 0.875585 18.8724 0.572491 18.649 0.349018C18.4255 0.125546 18.1225 0 17.8065 0C17.4905 0 17.1874 0.125546 16.964 0.349018L9.5 7.82565L2.03603 0.349018C1.81259 0.125546 1.50952 2.80593e-07 1.19352 2.82947e-07C0.877516 2.85302e-07 0.574455 0.125546 0.351006 0.349018C0.127557 0.572491 0.00202541 0.875585 0.0020254 1.19162C0.0020254 1.50766 0.127557 1.81075 0.351006 2.03423L7.82684 9.49899L0.351006 16.9637C0.239784 17.0741 0.151505 17.2053 0.0912611 17.35C0.031017 17.4946 0 17.6497 0 17.8064C0 17.963 0.031017 18.1181 0.0912611 18.2628C0.151505 18.4074 0.239784 18.5386 0.351006 18.649C0.46132 18.7602 0.592563 18.8485 0.737166 18.9087C0.881769 18.969 1.03687 19 1.19352 19C1.35017 19 1.50527 18.969 1.64987 18.9087C1.79448 18.8485 1.92572 18.7602 2.03603 18.649L9.5 11.1723L16.964 18.649C17.0743 18.7602 17.2055 18.8485 17.3501 18.9087C17.4947 18.969 17.6498 19 17.8065 19C17.9631 19 18.1182 18.969 18.2628 18.9087C18.4074 18.8485 18.5387 18.7602 18.649 18.649C18.7602 18.5386 18.8485 18.4074 18.9087 18.2628C18.969 18.1181 19 17.963 19 17.8064C19 17.6497 18.969 17.4946 18.9087 17.35C18.8485 17.2053 18.7602 17.0741 18.649 16.9637L11.1732 9.49899Z" fill="white"/>
                </svg>
            </button>
            <div id="quizPopupContent">
                <p id="quizPopupMainTitle">Quiz</p>
                <p id="quizPopupMediaTitle">${media.title} (${media.year})</p>
                <p id="quizPopupQuestionCount">${matchingQuiz ? matchingQuiz.questions.length : 0} questions</p>
                <button id="startQuizButton">Start</button>
            </div>
        `;

        parent.appendChild(popup);

        document.getElementById("startQuizButton").addEventListener("click", () => {
            renderQuizpageContent("wrapper", mediaId, mediaType);
        });

        document.getElementById("closePopupButton").addEventListener("click", () => {
            parent.removeChild(popup);
        });
    }
}

renderFilterpageContainer("wrapper");
