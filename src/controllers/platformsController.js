import { validationResult, matchedData } from "express-validator";
import { NotFoundError } from "../errors/NotFoundError.js";
import {
  getAllPlatforms,
  getPlatformById,
  getGamesByPlatform,
  createPlatformQuery,
  updatePlatformQuery,
  deletePlatformQuery,
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
    backUrl: "/platforms",
    requirePassword: false,
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
      backUrl: "/platforms",
      requirePassword: false,
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
        backUrl: "/platforms",
        requirePassword: false,
      });
    }
    next(err);
  }
};

const getPlatform = async (req, res, next) => {
  const { id } = req.params;
  try {
    const platform = await getPlatformById(id);
    if (!platform) {
      return next(new NotFoundError("Platform not found."));
    }
    const games = await getGamesByPlatform(id);
    res.render("platform", { platform, games, errors: [] });
  } catch (err) {
    next(err);
  }
};

const editPlatform = async (req, res, next) => {
  const { id } = req.params;
  try {
    const platform = await getPlatformById(id);
    if (!platform) {
      return next(new NotFoundError("Platform not found."));
    }
    res.render("platformForm", {
      errors: [],
      value: platform.name,
      action: `/platforms/${id}`,
      heading: "Edit Platform",
      buttonText: "Update Platform",
      backUrl: `/platforms/${id}`,
      requirePassword: true,
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
      backUrl: `/platforms/${id}`,
      requirePassword: true,
    });
  }

  if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).render("platformForm", {
      errors: [{ msg: "Incorrect admin password." }],
      value: req.body.name,
      action: `/platforms/${id}`,
      heading: "Edit Platform",
      buttonText: "Update Platform",
      backUrl: `/platforms/${id}`,
      requirePassword: true,
    });
  }

  const { name } = matchedData(req);
  try {
    const platform = await getPlatformById(id);
    if (!platform) {
      return next(new NotFoundError("Platform not found."));
    }
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
        backUrl: `/platforms/${id}`,
        requirePassword: true,
      });
    }
    next(err);
  }
};

const deletePlatform = async (req, res, next) => {
  const { id } = req.params;
  try {
    const platform = await getPlatformById(id);
    if (!platform) {
      return next(new NotFoundError("Platform not found."));
    }
    if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
      const games = await getGamesByPlatform(id);
      return res
        .status(403)
        .render("platform", { platform, games, errors: [{ msg: "Incorrect admin password." }] });
    }
    await deletePlatformQuery(id);
    res.redirect("/platforms");
  } catch (err) {
    next(err);
  }
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
