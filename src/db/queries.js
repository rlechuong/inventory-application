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

const updateGenreQuery = async (id, name) => {
  await pool.query("UPDATE genres SET name = $1 WHERE id = $2", [name, id]);
};

const deleteGenreQuery = async (id) => {
  await pool.query("DELETE FROM genres WHERE id = $1", [id]);
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

const updatePlatformQuery = async (id, name) => {
  await pool.query("UPDATE platforms SET name = $1 WHERE id = $2", [name, id]);
};

const deletePlatformQuery = async (id) => {
  await pool.query("DELETE FROM platforms WHERE id = $1", [id]);
};

// Games

const getAllGames = async () => {
  const { rows } = await pool.query("SELECT * FROM games ORDER BY title");
  return rows;
};

const getGameById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT *, TO_CHAR(release_date, 'YYYY-MM-DD') AS release_date
    FROM games
    WHERE id = $1`,
    [id],
  );
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
    RETURNING id`,
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

const updateGameQuery = async (id, gameData) => {
  await pool.query(
    `UPDATE games 
    SET title = $1, developer = $2, publisher = $3, release_date = $4, price = $5, stock = $6, cover_image_url = $7, description = $8
    WHERE id = $9`,
    [
      gameData.title,
      gameData.developer,
      gameData.publisher,
      gameData.release_date,
      gameData.price,
      gameData.stock,
      gameData.cover_image_url,
      gameData.description,
      id,
    ],
  );
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

const deleteGameGenres = async (gameId) => {
  await pool.query("DELETE FROM game_genres WHERE game_id = $1", [gameId]);
};

const deleteGamePlatforms = async (gameId) => {
  await pool.query("DELETE FROM game_platforms WHERE game_id = $1", [gameId]);
};

const deleteGameQuery = async (id) => {
  await pool.query("DELETE FROM games WHERE id = $1", [id]);
};

export {
  getAllGenres,
  getGenreById,
  getGamesByGenre,
  createGenreQuery,
  updateGenreQuery,
  deleteGenreQuery,
  getAllPlatforms,
  getPlatformById,
  getGamesByPlatform,
  createPlatformQuery,
  updatePlatformQuery,
  deletePlatformQuery,
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
};
