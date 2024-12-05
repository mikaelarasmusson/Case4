"use strict";

//filter films or series by genre
function filterGenre (array, chosenGenre) {

    const filteredArray = [];

    for (let i = 0; i < array.length; i++) {

        const currentMedia = array[i];
        const currentGenres = array[i].genre;

        for (let j = 0; j < currentGenres.length; j++) {
            if (currentGenres[j] == chosenGenre) {
                filteredArray.push(currentMedia);
            }
        }
    }
    console.log(filteredArray);
    return filteredArray;
}

