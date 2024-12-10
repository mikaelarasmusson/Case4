"use strict";

async function startApp() {
    await getData();
    render_login(document.getElementById("wrapper"));

}
startApp();

let request = new Request("/api/users");
fetch(request);
