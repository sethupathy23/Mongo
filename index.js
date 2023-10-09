import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import moviesRouter from "./router/movies.router.js";
import cors from "cors";
import bcrypt from "bcrypt";
import usersRouter from "./router/users.router.js";

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
app.use(cors());

//Intercepts = apply middleware -> converting body to json
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const HashedPassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(HashedPassword);
}
generateHashedPassword("password@123");
