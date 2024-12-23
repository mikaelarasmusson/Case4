"use strict";

async function startApp() {
    await getData();
    render_login(document.getElementById("wrapper"));
}

startApp();

