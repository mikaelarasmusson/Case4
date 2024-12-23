"use strict"

const _STATE = {
    films: [],
    series: [],
    quizfilms: [],
    quizseries: [],
    users: []
};

async function getData() {
    const filmRequest = new Request("./api/films");
    const seriesRequest = new Request("./api/series");
    const quizfilmsRequest = new Request("./api/quizfilms");
    const quizseriesRequest = new Request("./api/quizseries");
    const usersRequest = new Request("/api/users");

    const films = await fetcher(filmRequest);
    const series = await fetcher(seriesRequest);
    const quizfilms = await fetcher(quizfilmsRequest);
    const quizseries = await fetcher(quizseriesRequest);
    const users = await fetcher(usersRequest);

    _STATE.films = films;
    _STATE.series = series;
    _STATE.quizfilms = quizfilms;
    _STATE.quizseries = quizseries;
    _STATE.users = users;
}

const State = {
    get(entity) {
        const dataClone = JSON.parse(JSON.stringify(_STATE[entity]));
        return dataClone;
    }
}

async function fetcher (request) {
    try {
        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const resource = await response.json()
        return resource;
    } catch (error) {
        console.log(error);
    }
}