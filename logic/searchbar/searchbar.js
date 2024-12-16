"use strict";

function searchTitle (event, search, media) {

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


function basicSearch(array, search) {

    for (let i = 0; i < array.length; i++) {
        let currentMedia = array[i];
        
    }
}