"use strict";

async function startApp() {

    // const user = localStorage.getItem("user");
    await getData();
    render_login(document.getElementById("wrapper"));
}

startApp();

//TODO:
//bättre feedback på om man blockat någon eller använt sin x2 powerup
//fixa så att totalScore uppdateras och inte bara byts ut
