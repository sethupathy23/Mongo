import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import moviesRouter from "./router/movies.router.js";
const app = express();
const PORT = process.env.PORT;
//.env = environment variables
console.log(process.env.MONGO_URL);

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

export const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

//Intercepts = apply middleware -> converting body to json
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/movies", moviesRouter);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
