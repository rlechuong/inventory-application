import { Router } from "express";
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

gamesRouter.get("/", listGames);

gamesRouter.get("/new", newGame);

gamesRouter.post("/", createGame);

gamesRouter.get("/:id", getGame);

gamesRouter.get("/:id/edit", editGame);

gamesRouter.post("/:id", updateGame);

gamesRouter.post("/:id/delete", deleteGame);

export { gamesRouter };
