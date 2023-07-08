var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

const { createListing, getCollections } = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (request, response) => {
  if (request.path == "/addNewRow") {
    console.log("request body", request.body);

    const { name, age } = request.body;
    const adding = {
      name,
      age,
    };
    const res = await createListing(adding);
    response.json({ message: res });
  } else if (request.path == "/getAllCollections") {
    console.log("request url :: ", request.url);
    const res = await getCollections();
    console.log("post process log ::", res);
    response.json(res);
  } else {
    response.json({ message1: "Hey! This is your server response!" });
  }
});

module.exports = app;
