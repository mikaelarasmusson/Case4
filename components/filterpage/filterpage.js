"use strict"

function renderFilterpageContainer(parentId) {
    // Get the parent element
    const parent = document.getElementById(parentId);
    console.log(parent);
    
    // Clear the parent element's content
    parent.innerHTML = "";
    
    // Create a new container element
    const container = document.createElement("div");
    container.id = "filterpageContainer"; 
    
    // Append the container to the parent element
    parent.append(container);
        
    // Render the landing page content inside the container
    renderProfile(container.id);
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
  
    profileContainer.append(profileContent);
}

function renderSearchbar(parentId) {
    const parent = document.getElementById(parentId);

    const searchContainer = document.createElement("div");
    searchContainer.id = "searchContainer";

    const searchbar = document.createElement("input");
    searchbar.type = "text";
    searchbar.placeholder = "Search for films and series...";
    searchbar.id = "searchBar";
    searchContainer.append(searchbar);

    const searchButton = document.createElement("button");
    searchButton.id = "searchButton";
    searchButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M15.7372 14.4753L12.7159 11.463C13.6907 10.2211 14.2196 8.68756 14.2176 7.10882C14.2176 5.70283 13.8007 4.32841 13.0196 3.15937C12.2385 1.99033 11.1282 1.07918 9.82925 0.54113C8.53028 0.00308012 7.10094 -0.137698 5.72196 0.136597C4.34299 0.410893 3.07631 1.08794 2.08213 2.08213C1.08794 3.07631 0.410893 4.34299 0.136597 5.72196C-0.137698 7.10094 0.00308012 8.53028 0.54113 9.82925C1.07918 11.1282 1.99033 12.2385 3.15937 13.0196C4.32841 13.8007 5.70283 14.2176 7.10882 14.2176C8.68756 14.2196 10.2211 13.6907 11.463 12.7159L14.4753 15.7372C14.5579 15.8204 14.6562 15.8865 14.7645 15.9317C14.8728 15.9768 14.9889 16 15.1062 16C15.2236 16 15.3397 15.9768 15.448 15.9317C15.5563 15.8865 15.6545 15.8204 15.7372 15.7372C15.8204 15.6545 15.8865 15.5563 15.9317 15.448C15.9768 15.3397 16 15.2236 16 15.1062C16 14.9889 15.9768 14.8728 15.9317 14.7645C15.8865 14.6562 15.8204 14.5579 15.7372 14.4753ZM1.77721 7.10882C1.77721 6.05433 2.0899 5.02352 2.67575 4.14674C3.26159 3.26996 4.09428 2.58659 5.0685 2.18305C6.04273 1.77952 7.11474 1.67393 8.14897 1.87965C9.1832 2.08538 10.1332 2.59316 10.8788 3.3388C11.6245 4.08444 12.1323 5.03444 12.338 6.06868C12.5437 7.10291 12.4381 8.17492 12.0346 9.14914C11.6311 10.1234 10.9477 10.9561 10.0709 11.5419C9.19413 12.1277 8.16332 12.4404 7.10882 12.4404C5.69479 12.4404 4.33867 11.8787 3.3388 10.8788C2.33893 9.87897 1.77721 8.52285 1.77721 7.10882Z" fill="white"/>
        </svg>
    `;
    searchContainer.append(searchButton);

    parent.append(searchContainer);
}

function renderFilterContainer (parentId) {
    const parent = document.getElementById(parentId);
    const container = document.createElement("div");
    container.id = "filterContainer";

    parent.append(container);
}

function renderFilterContents (parentId) {
    const parent = document.getElementById(parentId);
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";
    
    const buttonFilms = document.createElement("button");
    buttonFilms.id = "buttonFilms";
    buttonFilms.classList.add("filterpageButton");
    buttonFilms.textContent = "Films";
    buttonContainer.append(buttonFilms);
    
    const buttonSeries = document.createElement("button");
    buttonSeries.id = "buttonSeries";    
    buttonSeries.classList.add("filterpageButton");
    buttonSeries.textContent = "Series";
    buttonContainer.append(buttonSeries);   

    parent.append(buttonContainer);
}


