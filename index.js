const request = new Request("/api/series");

async function test () {
    let response = await fetch(request);
    let movies = await response.json();
    console.log(movies);
}

test();