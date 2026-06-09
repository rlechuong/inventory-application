import { Router } from "express";
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

platformsRouter.get("/", listPlatforms);

platformsRouter.get("/new", newPlatform);

platformsRouter.post("/", createPlatform);

platformsRouter.get("/:id", getPlatform);

platformsRouter.get("/:id/edit", editPlatform);

platformsRouter.post("/:id", updatePlatform);

platformsRouter.post("/:id/delete", deletePlatform);

export { platformsRouter };
