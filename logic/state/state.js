"use strict"

const _STATE = {

};

const State = {
    get,
    post,
    patch,
    Delete,
    LoginRegister
}

async function get(data) {
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);

    if (response.ok) {
        const resource = await response.json();
        _STATE[entity] = resource;
    }
}

async function post(data) {
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);
    if (!response.ok) {
        alert ("Something went wrong" + response.statusText);
        return;
    }

    const resource = await response.json();
    
    _STATE[entity].push(resource);
}

async function patch(data) {
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);

    if (response !== undefined) {
        const resource = await response.json();

    } else {

    }
}

async function Delete(data) {
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);
     if (response !== undefined) {

     }
}

async function LoginRegister(data) {
    const type = data.type;
    const entity = data.entity;
    const rqst = data.rqst;

    const response = await fetcher(rqst);

    if (response.ok) {
        const resource = await fetcher(rqst);

        switch (type) {
            case "Login":
                break;
            case "Register":
                break;
        }
    }
}