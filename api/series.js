"user strict";

import * as func from "./functions.js";

export async function seriesHandler(req) {

    const options = {
        headers: {"Content-Type": "application/json"}
    };

    const series = await func.getFile("./database/series.json");
    
    if (!series) {
        return func.sendResponse("Internal server error", 500);
    }

    return new Response(JSON.stringify(series), options);
}