import pool from "./pool.js";

// Genres

const getAllGenres = async () => {
  const { rows } = await pool.query("SELECT * FROM genres ORDER BY name");
  return rows;
};

const getGenreById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM genres WHERE id = $1", [id]);
  return rows[0];
};

const getGamesByGenre = async (id) => {
  const { rows } = await pool.query(
    `SELECT games.*
    FROM games
    INNER JOIN game_genres ON games.id = game_genres.game_id
    INNER JOIN genres ON game_genres.genre_id = genres.id
    WHERE genres.id = $1`,
    [id],
  );
  return rows;
};

const createGenreQuery = async (name) => {
  await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);
};

// Platforms

const getAllPlatforms = async () => {
  const { rows } = await pool.query("SELECT * FROM platforms ORDER BY name");
  return rows;
};

const getPlatformById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM platforms WHERE id = $1", [id]);
  return rows[0];
};

const getGamesByPlatform = async (id) => {
  const { rows } = await pool.query(
    `SELECT games.*
    FROM games
    INNER JOIN game_platforms ON games.id = game_platforms.game_id
    INNER JOIN platforms ON game_platforms.platform_id = platforms.id
    WHERE platforms.id = $1`,
    [id],
  );
  return rows;
};

const createPlatformQuery = async (name) => {
  await pool.query("INSERT INTO platforms (name) VALUES ($1)", [name]);
};

// Games

const getAllGames = async () => {
  const { rows } = await pool.query("SELECT * FROM games ORDER BY title");
  return rows;
};

const getGameById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
  return rows[0];
};

const getGenresByGame = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT genres.*
    FROM genres
    INNER JOIN game_genres ON genres.id = game_genres.genre_id
    INNER JOIN games ON game_genres.game_id = games.id
    WHERE games.id = $1`,
    [id],
  );
  return rows;
};

const getPlatformsByGame = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT platforms.*
    FROM platforms
    INNER JOIN game_platforms ON platforms.id = game_platforms.platform_id
    INNER JOIN games ON game_platforms.game_id = games.id
    WHERE games.id = $1`,
    [id],
  );
  return rows;
};

const createGameQuery = async (gameData) => {
  const { rows } = await pool.query(
    `
    INSERT INTO games (title, developer, publisher, release_date, price, stock, cover_image_url, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURN id`,
    [
      gameData.title,
      gameData.developer,
      gameData.publisher,
      gameData.release_date,
      gameData.price,
      gameData.stock,
      gameData.cover_image_url,
      gameData.description,
    ],
  );
  return rows[0].id;
};

// Join Tables

const addGameGenre = async (gameId, genreId) => {
  await pool.query("INSERT INTO game_genres (game_id, genre_id) VALUES ($1, $2)", [
    gameId,
    genreId,
  ]);
};

const addGamePlatform = async (gameId, platformId) => {
  await pool.query("INSERT INTO game_platforms (game_id, platform_id) VALUES ($1, $2)", [
    gameId,
    platformId,
  ]);
};

export {
  getAllGenres,
  getGenreById,
  getGamesByGenre,
  createGenreQuery,
  getAllPlatforms,
  getPlatformById,
  getGamesByPlatform,
  createPlatformQuery,
  getAllGames,
  getGameById,
  getGenresByGame,
  getPlatformsByGame,
  createGameQuery,
  addGameGenre,
  addGamePlatform,
};
