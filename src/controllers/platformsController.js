import { getAllPlatforms, getPlatformById, getGamesByPlatform } from "../db/queries.js";

const listPlatforms = async (req, res, next) => {
  try {
    const platforms = await getAllPlatforms();
    res.render("platforms", { platforms });
  } catch (err) {
    next(err);
  }
};

const newPlatform = (req, res) => {
  res.send("Show new platform form.");
};

const createPlatform = (req, res) => {
  res.send("Submit new platform form.");
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
