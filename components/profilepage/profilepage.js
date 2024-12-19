"use strict"

function renderProfilePageContainer (parentId) {
    const parent = document.getElementById(parentId);

    const container = document.createElement("div");
    container.id = "profilePageContainer";
    parent.append(container);

    // Rendera allt här
    renderProfilePageBackArrow(container.id);
    renderMyProfileContent(container.id);
}

function renderProfilePageBackArrow (parentId) {
    const parent = document.getElementById(parentId);

    const profileArrowTitleContainer = document.createElement("div");
    profileArrowTitleContainer.id = "profileArrowTitleContainer";
    
    profileArrowTitleContainer.innerHTML = `
    <button id="backArrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
            <path d="M9 19.6567L0 10L9 0.343346L11.1 2.67704L5.775 8.39056H24V11.6094H5.775L11.1 17.323L9 19.6567Z" fill="white"/>
        </svg>
    </button>
    <h2 id="profileTitle">My Profile</h2>
    `;

    parent.appendChild(profileArrowTitleContainer);

    document.getElementById("backArrow").addEventListener("click", () => {
        renderLandingpageContainer("wrapper");
    });
}

function renderMyProfileContent (parentId) {
    const parent = document.getElementById(parentId);

    const myProfileContentContainer = document.createElement("div");
    myProfileContentContainer.id = "myProfileContentContainer";

    let userInfo = State.get("users");

    myProfileContentContainer.innerHTML = `
    <div id="profileInfoPic">
        <img id="myProfilePic" src="${userInfo.profileImg}">
        <div id="editProfilePic">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M10.4651 0.534903C11.1783 1.24811 11.1783 2.40444 10.4651 3.11764L3.72025 9.86249C3.42769 10.1551 3.06111 10.3626 2.65971 10.463L0.567717 10.986C0.233336 11.0695 -0.0695479 10.7667 0.0140475 10.4323L0.537046 8.34029C0.637395 7.93889 0.844948 7.57231 1.13751 7.27975L7.88236 0.534903C8.59556 -0.178301 9.75189 -0.178301 10.4651 0.534903ZM7.2366 2.47186L1.7832 7.92543C1.60766 8.10097 1.48313 8.32092 1.42292 8.56176L1.08448 9.91552L2.43824 9.57708C2.67908 9.51687 2.89903 9.39234 3.07457 9.2168L8.52778 3.76303L7.2366 2.47186ZM8.52804 1.18059L7.88219 1.82627L9.17336 3.11745L9.81941 2.47196C10.176 2.11536 10.176 1.53719 9.81941 1.18059C9.46281 0.823986 8.88464 0.823986 8.52804 1.18059Z" fill="white"/>
            </svg>
        </div>
        <div id="starAndScore">
            <svg id="starIcon" xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                <path d="M18.9854 8.10816C19.0803 7.6103 18.7006 7.01288 18.2259 7.01288L12.8151 6.21631L10.347 1.03863C10.2521 0.839491 10.1572 0.73992 9.96731 0.640349C9.49268 0.341637 8.92312 0.540778 8.63834 1.03863L6.26517 6.21631L0.854341 7.01288C0.569561 7.01288 0.379707 7.11245 0.28478 7.31159C-0.0949268 7.70987 -0.0949268 8.3073 0.28478 8.70558L4.17678 12.6884L3.22751 18.3639C3.22751 18.5631 3.22751 18.7622 3.32244 18.9614C3.60722 19.4592 4.17678 19.6584 4.65141 19.3597L9.49268 16.6712L14.3339 19.3597C14.4289 19.4592 14.6187 19.4592 14.8086 19.4592C14.9035 19.4592 14.9035 19.4592 14.9984 19.4592C15.4731 19.3597 15.8528 18.8618 15.7578 18.2644L14.8086 12.5888L18.7006 8.60601C18.8904 8.50644 18.9854 8.3073 18.9854 8.10816Z" fill="#FFD07A"/>
            </svg>
            <p id="userPoints">${userInfo.score}</p>
        </div>
        <div id="nameAndPasswordContainer">
            <div id="myProfileName">
                <p>Profile Name</p>
                <p id="username">${userInfo.username}</p>
            </div>
            <div id="myProfilePassword">
                <p>Password</p>
                <p id="password">**********</p>
            </div>
        </div>
        <div id="myProfileSettingsContainer">
            <button id="privacyButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                    <path d="M7.99986 8.58269C8.79098 8.58269 9.56432 8.34636 10.2221 7.90358C10.8799 7.4608 11.3926 6.83146 11.6953 6.09514C11.9981 5.35882 12.0773 4.5486 11.9229 3.76693C11.7686 2.98525 11.3876 2.26724 10.8282 1.70369C10.2688 1.14014 9.55612 0.756352 8.78021 0.600867C8.0043 0.445383 7.20005 0.525183 6.46916 0.830176C5.73826 1.13517 5.11356 1.65166 4.67404 2.31433C4.23452 2.97699 3.99993 3.75608 3.99993 4.55307C3.99993 5.62179 4.42135 6.64674 5.17148 7.40244C5.92162 8.15814 6.93902 8.58269 7.99986 8.58269ZM7.99986 2.13529C8.47453 2.13529 8.93854 2.27709 9.33321 2.54276C9.72788 2.80843 10.0355 3.18603 10.2171 3.62782C10.3988 4.06961 10.4463 4.55575 10.3537 5.02475C10.2611 5.49375 10.0325 5.92456 9.69689 6.26269C9.36125 6.60082 8.93362 6.8311 8.46807 6.92439C8.00253 7.01768 7.51997 6.9698 7.08144 6.7868C6.6429 6.6038 6.26808 6.29391 6.00437 5.89631C5.74066 5.49871 5.5999 5.03126 5.5999 4.55307C5.5999 3.91183 5.85276 3.29686 6.30284 2.84344C6.75292 2.39002 7.36335 2.13529 7.99986 2.13529ZM19.3917 11.8064L16.1917 11.0005C16.0656 10.9691 15.9338 10.9691 15.8077 11.0005L14.3598 11.3631C13.481 10.6021 12.3586 10.187 11.1998 10.1945H4.79992C3.5269 10.1945 2.30602 10.704 1.40586 11.6108C0.505704 12.5177 0 13.7476 0 15.0301V17.4479C0 17.6616 0.0842842 17.8666 0.234311 18.0177C0.384337 18.1689 0.587817 18.2538 0.799986 18.2538H12.1438C12.7838 20.051 15.3437 21.2599 15.6717 21.405C15.7749 21.4517 15.8867 21.4758 15.9997 21.4758C16.1128 21.4758 16.2246 21.4517 16.3277 21.405C16.7037 21.2357 19.9997 19.6883 19.9997 17.4479V12.6123C20.005 12.4282 19.9476 12.2478 19.8369 12.1012C19.7263 11.9546 19.5692 11.8505 19.3917 11.8064ZM1.59997 15.0301C1.59997 14.1751 1.93711 13.3552 2.53721 12.7506C3.13732 12.146 3.95124 11.8064 4.79992 11.8064H11.1998C11.5691 11.8129 11.9345 11.8838 12.2798 12.0159C12.194 12.0898 12.1247 12.1812 12.0764 12.2839C12.0282 12.3867 12.0021 12.4986 11.9998 12.6123V16.6419H1.59997V15.0301ZM18.3997 17.4479C18.3997 18.2538 17.0717 19.2209 15.9997 19.777C14.9277 19.2209 13.5998 18.2538 13.5998 17.4479V13.2409L15.9997 12.6123L18.3997 13.2168V17.4479Z" fill="white"/>
                </svg>
                <p class="privacyText">Privacy</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="14" viewBox="0 0 7 14" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.35843L0.816681 0.5L7 7L0.816681 13.5L0 12.6415L5.36664 7L0 1.35843Z" fill="white"/>
                </svg>
            </button>
            <button id="settingsButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.6407 10.98C17.6818 10.66 17.7127 10.34 17.7127 10C17.7127 9.66 17.6818 9.34 17.6407 9.02L19.8099 7.37C20.0052 7.22 20.0566 6.95 19.9333 6.73L17.8772 3.27C17.7538 3.05 17.4762 2.97 17.25 3.05L14.6902 4.05C14.1556 3.65 13.5799 3.32 12.9528 3.07L12.5621 0.42C12.5313 0.18 12.3154 0 12.0584 0H7.94616C7.68915 0 7.47326 0.18 7.44242 0.42L7.05176 3.07C6.42464 3.32 5.84894 3.66 5.31435 4.05L2.7545 3.05C2.51804 2.96 2.25075 3.05 2.12738 3.27L0.0712765 6.73C-0.0623704 6.95 -0.000687048 7.22 0.194643 7.37L2.36384 9.02C2.32271 9.34 2.29187 9.67 2.29187 10C2.29187 10.33 2.32271 10.66 2.36384 10.98L0.194643 12.63C-0.000687048 12.78 -0.0520898 13.05 0.0712765 13.27L2.12738 16.73C2.25075 16.95 2.52832 17.03 2.7545 16.95L5.31435 15.95C5.84894 16.35 6.42464 16.68 7.05176 16.93L7.44242 19.58C7.47326 19.82 7.68915 20 7.94616 20H12.0584C12.3154 20 12.5313 19.82 12.5621 19.58L12.9528 16.93C13.5799 16.68 14.1556 16.34 14.6902 15.95L17.25 16.95C17.4865 17.04 17.7538 16.95 17.8772 16.73L19.9333 13.27C20.0566 13.05 20.0052 12.78 19.8099 12.63L17.6407 10.98ZM10.0023 13.5C8.01813 13.5 6.40408 11.93 6.40408 10C6.40408 8.07 8.01813 6.5 10.0023 6.5C11.9864 6.5 13.6005 8.07 13.6005 10C13.6005 11.93 11.9864 13.5 10.0023 13.5Z" fill="white"/>
                </svg>
                <p class="settingsText">Settings</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="14" viewBox="0 0 7 14" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.35843L0.816681 0.5L7 7L0.816681 13.5L0 12.6415L5.36664 7L0 1.35843Z" fill="white"/>
                </svg>
            </button>
            <button id="helpButton">
                <p class="helpText">Help & Support</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="14" viewBox="0 0 7 14" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.35843L0.816681 0.5L7 7L0.816681 13.5L0 12.6415L5.36664 7L0 1.35843Z" fill="white"/>
                </svg>
            </button>
            <button id="signOutButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2.12676 20C1.53245 20 1.02941 19.7941 0.617647 19.3824C0.205882 18.9706 0 18.4676 0 17.8732V2.12676C0 1.53245 0.205882 1.02941 0.617647 0.617647C1.02941 0.205882 1.53245 0 2.12676 0H10.0112V1.76471H2.12676C2.03618 1.76471 1.95324 1.80245 1.87794 1.87794C1.80245 1.95323 1.76471 2.03618 1.76471 2.12676V17.8732C1.76471 17.9638 1.80245 18.0468 1.87794 18.1221C1.95324 18.1975 2.03618 18.2353 2.12676 18.2353H10.0112V20H2.12676ZM14.9774 15.0226L13.7556 13.7465L16.62 10.8824H6.58382V9.11765H16.62L13.7556 6.25353L14.9774 4.97735L20 10L14.9774 15.0226Z" fill="white"/>
                </svg>
                <p class="signOutText">Sign Out</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="14" viewBox="0 0 7 14" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.35843L0.816681 0.5L7 7L0.816681 13.5L0 12.6415L5.36664 7L0 1.35843Z" fill="white"/>
                </svg>
            </button>
        </div>
    </div>
    `;

    parent.appendChild(myProfileContentContainer);

    document.getElementById("signOutButton").addEventListener("click", () => {
        localStorage.clear();
        render_login("wrapper");
    });
}