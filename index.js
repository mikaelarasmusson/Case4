"use strict";

async function startApp() {

    // const user = localStorage.getItem("user");
    await getData();
    render_login(document.getElementById("wrapper"));
}

startApp();

//fixa konstig padding
//länka bilder
