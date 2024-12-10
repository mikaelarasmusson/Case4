
function render_login (parent){
    document.querySelector("#wrapper").innerHTML = "";
    const container = document.createElement("div");
    container.id = "login_container"
    parent.appendChild(container);

    container.innerHTML = `
    <div id="outer_box">
        <div id="title_wrapper">
            <p>PlotTwist</p>
            <p>Love movies? Test your knowledge with PlotTwist! Play solo or challenge friends, pick a film, and see who’s the real movie master — just watch out for a plot twist!</p>
        </div>
        
        <div id="test">
            <div id="inner_box">
                <div id="username_field">
                    <input type="text" placeholder="Username" class ="username_password">
                </div>
                <div id="password_field">
                    <input type="password" placeholder="Password" class ="username_password">
                    <p id = "forgotten_password">Forgot password?</p>
                </div>
            </div>

            <div id="register">
                <p id="create_acc">Sign in</p>
                <p>Don’t have an account? <span id="sign_up_button">Sign Up</span> </p>
            </div>
        </div>
    </div> `

    document.querySelector("#create_acc").addEventListener("click", async () => {

        const usernameInput = document.getElementById("username_field").querySelector("input");
        const passwordInput = document.getElementById("password_field").querySelector("input")
        
        let username = usernameInput.value;
        let password = passwordInput.value;
        
        usernameInput.value = "";
        passwordInput.value = "";

        const request = new Request("/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: username, password: password})
        });
        
        const response = await fetch(request)
        if (response.ok) {
            const user = await response.json();
            localStorage.setItem("user", JSON.stringify(user));
            renderLandingpageContainer("wrapper");
        } else {
            console.log("error");
        }
    });

    document.querySelector("#sign_up_button").addEventListener("click", () => {
        render_create_acc(document.querySelector("#wrapper"));
    });
}

const new_wrapper = document.querySelector("#wrapper");

function render_create_acc(parent) {
    document.querySelector("#wrapper").innerHTML = "";

    const new_container = document.createElement("div");
    new_container.id = "create_acc_container"
    parent.appendChild(new_container);

    new_container.innerHTML = `
    <div id="outer_box">
        <div id="title_wrapper">
            <p>PlotTwist</p>
            <p>Love movies? Test your knowledge with PlotTwist! Play solo or challenge friends, pick a film, and see who’s the real movie master — just watch out for a plot twist!</p>
        </div>

        <div id = "test">
            <div id="inner_box">
                <div id="username_field">
                    <input type="text" placeholder="Username" id="username">
                </div>
                <div id="password_field">
                    <input type="password" placeholder="Password" id="password">
                </div>
                <div id="repeat_password_field">
                    <input type="password" placeholder="Repeat password" id="password">
                </div>
            </div>

            <div id="login_create_acc">
                <p id="create_acc">Sign Up</p>
                <p>Already have an account? <span id="log_in_here"> Sign In</span> </p>
            </div>
        </div>
        
    </div> `

    document.querySelector("#log_in_here").addEventListener("click", () => {
        render_login(document.querySelector("#wrapper"));
    });
}
render_create_acc(document.querySelector("#wrapper"));




