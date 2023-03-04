import express from "express";
import {
  getmovies,
  getMovieById,
  createMovies,
  deleteMovieById,
  updateMovieById,
} from "../service/movies.service.js";
const router = express.Router();
router.get("/", async function (request, response) {
  // app.post("/", async function (request, response) {
  //   console.log(request.body);
  //   response.send(request.body);
  // });

  const movies = await getmovies();
  console.log(movies);
  response.send(movies);
});
//http://localhost:3000/movies

router.get("/", function (request, response) {
  response.send(movies);
});

//Dummy Mock Api
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  const movie = await getMovieById(id);

  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "Movie not found" });
});

//express.json()-middleware
router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);

  // db.movies.insertMany(data)
  const result = await createMovies(data);

  response.send(result);
});

//delete
router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  const result = await deleteMovieById(id);

  console.log(result);
  result.deletedCount > 0
    ? response.send({ message: "Movie deleted successfully" })
    : response.status(404).send({ message: "Movie not found" });
});

//update
router.put("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  console.log(data);
  console.log(id);
  const result = await updateMovieById(id, data);
  response.send(result);
});

export default router;
