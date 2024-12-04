"use strict";
import * as func from "./functions.js";

export async function mediaHandler(req, pathname) {

    switch (pathname) {
        case "/api/movies": {
            const options = {
                headers: {"Content-Type": "application/json"}
            };
        
            const movies = await func.getFile("./database/films.json");
        
            if (!movies) {
                return func.sendResponse("Internal server error", 500);
            }
        
            return new Response(JSON.stringify(movies), options);
        }
        case "/api/series": {
            const options = {
                headers: {"Content-Type": "application/json"}
            };
        
            const series = await func.getFile("./database/series.json");
            
            if (!series) {
                return func.sendResponse("Internal server error", 500);
            }
        
            return new Response(JSON.stringify(series), options);
        }
        case "/api/quizfilms": {
            const options = {
                headers: {"Content-Type": "application/json"}
            }

            const quizfilms = await func.getFile("./database/quizfilms.json");

            if (!quizfilms) {
                return func.sendResponse("Internal server error", 500);
            }

            return new Response(JSON.stringify(quizfilms), options);
        }

        case "/api/quizseries": {
            const options = {
                headers: {"Content-Type": "application/json"}
            }

            const quizseries = await func.getFile("./database/quizseries.json");

            if (!quizseries) {
                return func.sendResponse("Internal server error", 500);
            }

            return new Response(JSON.stringify(quizseries), options);
        }
    }
}