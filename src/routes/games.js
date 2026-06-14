import { Router } from "express";
import { body } from "express-validator";
import {
  listGames,
  newGame,
  createGame,
  getGame,
  editGame,
  updateGame,
  deleteGame,
} from "../controllers/gamesController.js";

const gamesRouter = Router();

const validateGame = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: 2, max: 255 })
    .withMessage("Title must be between 2 and 255 characters."),
  body("developer")
    .trim()
    .notEmpty()
    .withMessage("Developer is required.")
    .isLength({ min: 2, max: 255 })
    .withMessage("Developer must be between 2 and 255 characters."),
  body("publisher")
    .trim()
    .notEmpty()
    .withMessage("Publisher is required.")
    .isLength({ min: 2, max: 255 })
    .withMessage("Publisher must be between 2 and 255 characters."),
  body("release_date")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("Must be a valid date."),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required.")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number.")
    .toFloat(),
  body("stock")
    .trim()
    .notEmpty()
    .withMessage("Stock is required.")
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive whole number or 0.")
    .toInt(),
  body("cover_image_url")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Cover Image URL must be a valid URL."),
  body("description")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must be no longer than 1000 characters."),
  body("genres").optional({ values: "falsy" }).toArray(),
  body("platforms").optional({ values: "falsy" }).toArray(),
];

gamesRouter.get("/", listGames);

gamesRouter.get("/new", newGame);

gamesRouter.post("/", validateGame, createGame);

gamesRouter.get("/:id", getGame);

gamesRouter.get("/:id/edit", editGame);

gamesRouter.post("/:id", validateGame, updateGame);

gamesRouter.post("/:id/delete", deleteGame);

export { gamesRouter };
