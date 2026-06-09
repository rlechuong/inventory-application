import pool from "./pool.js";

const getAllGenres = async () => {
  const { rows } = await pool.query("SELECT * FROM genres ORDER BY name");
  return rows;
};

const getGenreById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM genres WHERE id = $1", [id]);
  return rows[0];
};

export { getAllGenres, getGenreById };
