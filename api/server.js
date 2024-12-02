import { serveDir, serveFile } from "jsr:@std/http/file-server";
import { loginHandler } from "./login.js";
import { movieHandler } from "./movies.js";
import * as func from "./functions.js";

async function handler (req) {

    let pathname = new URL(req.url).pathname;
    console.log("pathname is" + pathname);

    if (req.method === "GET") {
        if (pathname === "/api/movies") {
            return movieHandler(req);
        }
    }

    if (req.method === "POST") {
        //do something
    }

    if (req.method === "PATCH") {
        //do something
    }

    if (req.method === "DELETE") {
        //do something
    }
    if (pathname.startsWith("/")) {
        return await serveDir(req, {
            fsRoot: "../",
            urlRoot: ""
        })
    }



}

Deno.serve(handler);