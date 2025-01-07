"use strict";

async function startApp() {
    await getData();
    render_login(document.getElementById("wrapper"));
}

startApp();

//todo
//fixa så att x2 powerupen ändrar färg direkt. 