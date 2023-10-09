import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import { createUsers, getUsersByName } from "../service/users.service.js";
const router = express.Router();

async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);

  const userFromDB = getUsersByName(usersname);
  console.log(userFromDB);
  if (userFromDB) {
    response.status(400).send({ message: "username already exists" });
  } else if (password.length < 8) {
    response
      .status(400)
      .send({ message: " password must be atleast 8 characters" });
  } else {
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(hashedPassword);
    return hashedPassword;
  }
}

router.post("/signup", async function (request, response) {
  const { username, password } = request.body;

  const userFromDB = await getUsersByName(username);
  console.log(userFromDB);

  if (userFromDB){
    response.status(400).send({ message: "userName already exists"});
  } else if (password.length < 8){
     response
    .status(400)
    .send({ message: " password must be atleast 8 characters" });
} else {
  const hashedPassword = await generateHashedPassword(password);
  const result = await createUsers({
    username: username,
    password: hashedPassword,
  });
  response.send(result);
});


router.post("/login", async function (request, response) {
  const { username, password } = request.body;

  const userFromDB = await getUsersByName(username);
  console.log(userFromDB);
  if (!userFromDB){
    response.status(400).send({ message: "Invalid Credentials"});
  }
  else{
    const storedDBPassword = userFromDB.password;
    const ispasswordCheck = await bcrypt.compare(password,storedDBPassword);
    console.log(ispasswordCheck);
    if (isPasswordCheck) {
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
      response.send({message: "Successful login", token: token});
    }else{
      response.status(400).send({message: "Invalid Credentials"});
    }
  }
  });
export default router;
