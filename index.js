"use strict";

async function startApp() {

    // const user = localStorage.getItem("user");
    await getData();
    render_login(document.getElementById("wrapper"));
}

startApp();

//TODO:
//se till att rätt quiz startas beroende på om det är serie eller film
//Fixa så att powerups funkar som de ska
//fixa films and series knapparna så att de sorterar filmer och serier
//fixa profilbilder
//för att faktiskt kunna visa alla poäng en spelare samlat så kanske man kan lägga till en nyckel som är totalPoints, lite jobb med det dock.
//leaderboarden renderas om konstant
