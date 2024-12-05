import { serveDir, serveFile } from "jsr:@std/http/file-server";
import { loginHandler } from "./login.js";
import { registerHandler } from "./register.js";
import { mediaHandler } from "./media.js";
import { editProfileHandler } from "./edit.js";
import * as func from "./functions.js";

async function handler (req) {

    const pathname = new URL(req.url).pathname;
    console.log("pathname is" + pathname);

    if (req.method === "GET") {
        if (pathname === "/api/films") {
            return mediaHandler(req, pathname);
        }

        if (pathname === "/api/series") {
            return mediaHandler(req, pathname);
        }

        if (pathname === "/api/quizfilms") {
            return mediaHandler(req, pathname);
        }

        if (pathname === "/api/quizseries") {
            return mediaHandler(req, pathname);
        }
    }

    if (req.method === "POST") {
        if (pathname === "/api/login") {
            return loginHandler(req);
        }

        if (pathname === "/api/register") {
            return registerHandler(req);
        }
    }

    if (req.method === "PATCH") {
        if (pathname === "/api/edit") {
            return editProfileHandler(req);
        }
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