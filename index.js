// let data = {
//     username: "mikkan",
//     password: "lol123"
// }
// console.log(data);
// let json = JSON.stringify(data);
// console.log(json);
const request = new Request("/api/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username: "newuser", password: "testlösen"})
});

async function test () {
    let response = await fetch(request);
    let movies = await response.json();
    console.log(movies);
}

test();