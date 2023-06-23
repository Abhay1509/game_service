var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

const { createListing, getCollections } = require("./db");

app.use(async (request, response) => {
  if (request.path == "/addNewRow") {
    console.log("request body", request.params);
    console.log("request body", request.name);
    console.log("request body", request.num);
    console.log("request body", request.headers);
    console.log("request url :: ", request.url);
    console.log("request data :: ", response.data);
    const adding = {};
    adding.name = request.name;
    adding.num = request.num;
    const res = await createListing(adding);
    response.json({ message: res });
  } else if (request.path == "/getAllCollections") {
    console.log("request url :: ", request.url);
    const res = await getCollections();
    console.log("post process log ::", res);
    response.json(res);
  } else {
    response.json({ message: "Hey! This is your server response!" });
  }
});

module.exports = app;
