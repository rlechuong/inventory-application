import { getAllGenres, getAllPlatforms, getAllGames } from "../db/queries.js";

const renderIndex = async (req, res, next) => {
  try {
    const genres = await getAllGenres();
    const platforms = await getAllPlatforms();
    const games = await getAllGames();
    res.render("index", { genres, platforms, games });
  } catch (err) {
    next(err);
  }
};

export { renderIndex };
