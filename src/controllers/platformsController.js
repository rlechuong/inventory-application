import { validationResult, matchedData } from "express-validator";
import {
  getAllPlatforms,
  getPlatformById,
  getGamesByPlatform,
  createPlatformQuery,
  updatePlatformQuery,
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
  res.render("platformForm", {
    errors: [],
    value: "",
    action: "/platforms",
    heading: "New Platform",
    buttonText: "Create Platform",
  });
};

const createPlatform = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("platformForm", {
      errors: errors.array(),
      value: req.body.name,
      action: "/platforms",
      heading: "New Platform",
      buttonText: "Create Platform",
    });
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
        action: "/platforms",
        heading: "New Platform",
        buttonText: "Create Platform",
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

const editPlatform = async (req, res, next) => {
  const { id } = req.params;
  try {
    const platform = await getPlatformById(id);
    res.render("platformForm", {
      errors: [],
      value: platform.name,
      action: `/platforms/${id}`,
      heading: "Edit Platform",
      buttonText: "Update Platform",
    });
  } catch (err) {
    next(err);
  }
};

const updatePlatform = async (req, res, next) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("platformForm", {
      errors: errors.array(),
      value: req.body.name,
      action: `/platforms/${id}`,
      heading: "Edit Platform",
      buttonText: "Update Platform",
    });
  }

  const { name } = matchedData(req);
  try {
    await updatePlatformQuery(id, name);
    res.redirect(`/platforms/${id}`);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).render("platformForm", {
        errors: [{ msg: "A platform with that name already exists." }],
        value: name,
        action: `/platforms/${id}`,
        heading: "Edit Platform",
        buttonText: "Update Platform",
      });
    }
    next(err);
  }
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
