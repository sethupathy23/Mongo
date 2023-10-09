import { client } from "../index.js";

export async function createUsers(data) {
  return await client.db("B42WD2").collection("users").insertOne(data);
}
export async function getUsersByName(username) {
  return await client
    .db("B42WD2")
    .collection("users")
    .findOne({ username: username });
}
