import { validationResult, matchedData } from "express-validator";
import {
  getAllGenres,
  getAllPlatforms,
  getAllGames,
  getGameById,
  getGenresByGame,
  getPlatformsByGame,
  createGameQuery,
  updateGameQuery,
  addGameGenre,
  addGamePlatform,
  deleteGameGenres,
  deleteGamePlatforms,
} from "../db/queries.js";

const listGames = async (req, res, next) => {
  try {
    const games = await getAllGames();
    res.render("games", { games });
  } catch (err) {
    next(err);
  }
};

const newGame = async (req, res, next) => {
  try {
    const genres = await getAllGenres();
    const platforms = await getAllPlatforms();
    res.render("gameForm", {
      errors: [],
      values: {},
      genres,
      platforms,
      action: "/games",
      heading: "New Game",
      buttonText: "Create Game",
    });
  } catch (err) {
    next(err);
  }
};

const createGame = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    try {
      const genres = await getAllGenres();
      const platforms = await getAllPlatforms();
      return res.status(400).render("gameForm", {
        errors: errors.array(),
        values: req.body,
        genres,
        platforms,
        action: "/games",
        heading: "New Game",
        buttonText: "Create Game",
      });
    } catch (err) {
      return next(err);
    }
  }

  const {
    title,
    developer,
    publisher,
    release_date,
    price,
    stock,
    cover_image_url,
    description,
    genres,
    platforms,
  } = matchedData(req);
  try {
    const gameId = await createGameQuery({
      title,
      developer,
      publisher,
      release_date,
      price,
      stock,
      cover_image_url,
      description,
    });

    await Promise.all(genres.map((genreId) => addGameGenre(gameId, genreId)));
    await Promise.all(platforms.map((platformId) => addGamePlatform(gameId, platformId)));
    res.redirect(`/games/${gameId}`);
  } catch (err) {
    if (err.code === "23505") {
      const genres = await getAllGenres();
      const platforms = await getAllPlatforms();
      return res.status(400).render("gameForm", {
        errors: [{ msg: "A game with that title already exists." }],
        values: req.body,
        genres,
        platforms,
        action: "/games",
        heading: "New Game",
        buttonText: "Create Game",
      });
    }
    next(err);
  }
};

const getGame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await getGameById(id);
    const genres = await getGenresByGame(id);
    const platforms = await getPlatformsByGame(id);
    res.render("game", { game, genres, platforms });
  } catch (err) {
    next(err);
  }
};

const editGame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await getGameById(id);
    const gameGenres = await getGenresByGame(id);
    const gamePlatforms = await getPlatformsByGame(id);
    const genres = await getAllGenres();
    const platforms = await getAllPlatforms();
    game.genres = gameGenres.map((genre) => String(genre.id));
    game.platforms = gamePlatforms.map((platform) => String(platform.id));
    res.render("gameForm", {
      errors: [],
      values: game,
      genres,
      platforms,
      action: `/games/${id}`,
      heading: "Edit Game",
      buttonText: "Update Game",
    });
  } catch (err) {
    next(err);
  }
};

const updateGame = async (req, res, next) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    try {
      const genres = await getAllGenres();
      const platforms = await getAllPlatforms();
      return res.status(400).render("gameForm", {
        errors: errors.array(),
        values: req.body,
        genres,
        platforms,
        action: `/games/${id}`,
        heading: "Edit Game",
        buttonText: "Update Game",
      });
    } catch (err) {
      return next(err);
    }
  }

  const {
    title,
    developer,
    publisher,
    release_date,
    price,
    stock,
    cover_image_url,
    description,
    genres,
    platforms,
  } = matchedData(req);
  try {
    await updateGameQuery(id, {
      title,
      developer,
      publisher,
      release_date,
      price,
      stock,
      cover_image_url,
      description,
    });
    await deleteGameGenres(id);
    await deleteGamePlatforms(id);
    await Promise.all(genres.map((genreId) => addGameGenre(id, genreId)));
    await Promise.all(platforms.map((platformId) => addGamePlatform(id, platformId)));
    res.redirect(`/games/${id}`);
  } catch (err) {
    if (err.code === "23505") {
      const genres = await getAllGenres();
      const platforms = await getAllPlatforms();
      return res.status(400).render("gameForm", {
        errors: [{ msg: "A game with that title already exists." }],
        values: req.body,
        genres,
        platforms,
        action: `/games/${id}`,
        heading: "Edit Game",
        buttonText: "Update Game",
      });
    }
    next(err);
  }
};

const deleteGame = (req, res) => {
  res.send("Delete a game.");
};

export { listGames, newGame, createGame, getGame, editGame, updateGame, deleteGame };
