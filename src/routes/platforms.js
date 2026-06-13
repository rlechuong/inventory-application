import { Router } from "express";
import { body } from "express-validator";
import {
  listPlatforms,
  newPlatform,
  createPlatform,
  getPlatform,
  editPlatform,
  updatePlatform,
  deletePlatform,
} from "../controllers/platformsController.js";

const platformsRouter = Router();

const validatePlatform = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 2, max: 255 })
    .withMessage("Name must be between 2 and 255 characters."),
];

platformsRouter.get("/", listPlatforms);

platformsRouter.get("/new", newPlatform);

platformsRouter.post("/", validatePlatform, createPlatform);

platformsRouter.get("/:id", getPlatform);

platformsRouter.get("/:id/edit", editPlatform);

platformsRouter.post("/:id", validatePlatform, updatePlatform);

platformsRouter.post("/:id/delete", deletePlatform);

export { platformsRouter };
