import { Router } from "express";
import { body } from "express-validator";
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

const validateGenre = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 2, max: 255 })
    .withMessage("Name must be between 2 and 255 characters."),
];

genresRouter.get("/", listGenres);

genresRouter.get("/new", newGenre);

genresRouter.post("/", validateGenre, createGenre);

genresRouter.get("/:id", getGenre);

genresRouter.get("/:id/edit", editGenre);

genresRouter.post("/:id", updateGenre);

genresRouter.post("/:id/delete", deleteGenre);

export { genresRouter };
