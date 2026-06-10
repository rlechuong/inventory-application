import { getAllGenres, getGenreById, getGamesByGenre } from "../db/queries.js";

const listGenres = async (req, res, next) => {
  try {
    const genres = await getAllGenres();
    res.render("genres", { genres });
  } catch (err) {
    next(err);
  }
};

const newGenre = (req, res) => {
  res.send("Show new genre form.");
};

const createGenre = (req, res) => {
  res.send("Submit new genre form.");
};

const getGenre = async (req, res, next) => {
  const { id } = req.params;
  try {
    const genre = await getGenreById(id);
    const games = await getGamesByGenre(id);
    res.render("genre", { genre, games });
  } catch (err) {
    next(err);
  }
};

const editGenre = (req, res) => {
  res.send("Show edit genre form.");
};

const updateGenre = (req, res) => {
  res.send("Submit edit genre form.");
};

const deleteGenre = (req, res) => {
  res.send("Delete a genre.");
};

export { listGenres, newGenre, createGenre, getGenre, editGenre, updateGenre, deleteGenre };
