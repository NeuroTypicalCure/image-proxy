/*const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');*/

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import axios from 'axios';
import request from 'request';



const PORT = 5000;
const app = express();

app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request

app.get('/getMetMuseumSearch/:name', cors(corsOptions), async (req, res) => {
    const items = [];
    const ids = (await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=${req.params.name||"boat"}`)).data.objectIDs;
    for(let id of ids){
        const item = (await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)).data;
        items.push(item);
    }
    res.json(items);
});

app.get('/metMuseum/search/:name', cors(corsOptions), async (req, res) => {
    const items = [];
    const ids = (await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=${req.params.name||"boat"}`)).data.objectIDs;
    res.json(items);
});

app.get('/metMuseum/objects/', cors(corsOptions), async (req, res) => {
    const items = [];
    const ids = (await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects`)).data.objectIDs;
    for(let id of ids){
        const item = (await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)).data;
        items.push(item);
    }
    res.json(items);
});

app.get('/metMuseum/img/*', cors(corsOptions), async (req, res) => {
    const url = req.params[0];
    console.log(url);
    request.get(url).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});