import { validationResult, matchedData } from "express-validator";
import { NotFoundError } from "../errors/NotFoundError.js";
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
  deleteGameQuery,
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
      backUrl: "/games",
      requirePassword: false,
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
        backUrl: "/games",
        requirePassword: false,
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
        backUrl: "/games",
        requirePassword: false,
      });
    }
    next(err);
  }
};

const getGame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await getGameById(id);
    if (!game) {
      return next(new NotFoundError("Game not found."));
    }
    const genres = await getGenresByGame(id);
    const platforms = await getPlatformsByGame(id);
    res.render("game", { game, genres, platforms, errors: [] });
  } catch (err) {
    next(err);
  }
};

const editGame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await getGameById(id);
    if (!game) {
      return next(new NotFoundError("Game not found."));
    }
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
      backUrl: `/games/${id}`,
      requirePassword: true,
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
        backUrl: `/games/${id}`,
        requirePassword: true,
      });
    } catch (err) {
      return next(err);
    }
  }

  if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
    try {
      const genres = await getAllGenres();
      const platforms = await getAllPlatforms();
      return res.status(403).render("gameForm", {
        errors: [{ msg: "Incorrect admin password." }],
        values: req.body,
        genres,
        platforms,
        action: `/games/${id}`,
        heading: "Edit Game",
        buttonText: "Update Game",
        backUrl: `/games/${id}`,
        requirePassword: true,
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
    const game = await getGameById(id);
    if (!game) {
      return next(new NotFoundError("Game not found."));
    }
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
        backUrl: `/games/${id}`,
        requirePassword: true,
      });
    }
    next(err);
  }
};

const deleteGame = async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await getGameById(id);
    if (!game) {
      return next(new NotFoundError("Game not found."));
    }
    if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
      const genres = await getGenresByGame(id);
      const platforms = await getPlatformsByGame(id);
      return res.status(403).render("game", {
        game,
        genres,
        platforms,
        errors: [{ msg: "Incorrect admin password." }],
      });
    }
    await deleteGameQuery(id);
    res.redirect("/games");
  } catch (err) {
    next(err);
  }
};

export { listGames, newGame, createGame, getGame, editGame, updateGame, deleteGame };
