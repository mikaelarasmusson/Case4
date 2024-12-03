"use strict";

import * as func from "./functions.js";

//fetch with a request to "/api/movies"
export async function movieHandler(req) {

    const options = {
        headers: {"Content-Type": "application/json"}
    };

    const movies = await func.getFile("./database/films.json");

    if (!movies) {
        return func.sendResponse("Internal server error", 500);
    }

    return new Response(JSON.stringify(movies), options);

}
