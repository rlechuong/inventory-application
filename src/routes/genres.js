import { Router } from "express";
import {
  listGenres,
  newGenre,
  createGenre,
  getGenre,
  editGenre,
  updateGenre,
  deleteGenre,
} from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/", listGenres);

genresRouter.get("/new", newGenre);

genresRouter.post("/", createGenre);

genresRouter.get("/:id", getGenre);

genresRouter.get("/:id/edit", editGenre);

genresRouter.post("/:id", updateGenre);

genresRouter.post("/:id/delete", deleteGenre);

export { genresRouter };
