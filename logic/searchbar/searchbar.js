"use strict";

function searchTitle (search, media) {

    let searchQuery = search.trim().toLowerCase();
    let foundTitles = [];

    for (let i = 0; i < media.length; i++) {
        let currentMedia = media[i]
        let title = currentMedia.title.trim().toLowerCase();
        if (title.includes(searchQuery)) {
            foundTitles.push(currentMedia);
        }
    }
    return foundTitles;
}

function searchUser (search, users) {
    
    const searchQuery = search.trim().toLowerCase();
    const foundUsers = [];

    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        const name = currentUser.user.username.trim().toLowerCase();
        if (name.includes(searchQuery)) {
            foundUsers.push(currentUser);
        }
    }
    return foundUsers;
}