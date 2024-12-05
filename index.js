// let data = {
//     username: "mikkan",
//     password: "lol123"
// }
// console.log(data);
// let json = JSON.stringify(data);
// console.log(json);

const request = new Request("/api/edit", {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({id: 3, username: "nyttnamn", password: "nyttlösen"})
});

// const request = new Request("/api/series");

async function test () {
    let response = await fetch(request);
    let movies = await response.json();
    console.log(movies);
}

test();