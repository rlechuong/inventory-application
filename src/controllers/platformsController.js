import { validationResult, matchedData } from "express-validator";
import {
  getAllPlatforms,
  getPlatformById,
  getGamesByPlatform,
  createPlatformQuery,
} from "../db/queries.js";

const listPlatforms = async (req, res, next) => {
  try {
    const platforms = await getAllPlatforms();
    res.render("platforms", { platforms });
  } catch (err) {
    next(err);
  }
};

const newPlatform = (req, res) => {
  res.render("platformForm", { errors: [], value: "" });
};

const createPlatform = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("platformForm", { errors: errors.array(), value: req.body.name });
  }

  const { name } = matchedData(req);
  try {
    await createPlatformQuery(name);
    res.redirect("/platforms");
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).render("platformForm", {
        errors: [{ msg: "A platform with that name already exists." }],
        value: name,
      });
    }
    next(err);
  }
};

const getPlatform = async (req, res, next) => {
  const { id } = req.params;
  try {
    const platform = await getPlatformById(id);
    const games = await getGamesByPlatform(id);
    res.render("platform", { platform, games });
  } catch (err) {
    next(err);
  }
};

const editPlatform = (req, res) => {
  res.send("Show edit platform form.");
};

const updatePlatform = (req, res) => {
  res.send("Submit edit platform form.");
};

const deletePlatform = (req, res) => {
  res.send("Delete a platform.");
};

export {
  listPlatforms,
  newPlatform,
  createPlatform,
  getPlatform,
  editPlatform,
  updatePlatform,
  deletePlatform,
};
