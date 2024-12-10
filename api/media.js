"use strict";
import * as func from "./functions.js";

export async function mediaHandler(req, pathname) {

    switch (pathname) {
        case "/api/films": {
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

        case "/api/users": {
            //todo hämta users filen och ta bort lösenordet från alla användare och sen skicka tillbaka;
            console.log("hej");
            const options = {
                headers: {"Content-Type": "application/json"}
            }

            const users = await func.getFile("./database/users.json");

            if (!users) {
                return func.sendResponse("Internal server error", 500);
            }

            for (let i = 0; i < users.length; i++) {
                const currentUser = users[i];
                for (let key in currentUser)  {
                    console.log(key);
                }
            }
        }
    }
}