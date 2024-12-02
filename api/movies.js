"use strict";

import * as func from "./functions.js";

//fetch with a request to "/api/movies"
export async function movieHandler(req) {

    const movies = await func.getFile("./database/films.json");

    if (!movies) {
        return func.sendResponse("Not found", 404);
    }

    return new Response(JSON.stringify(movies), {status: 200});

}
