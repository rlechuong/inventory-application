import { getAllGenres, getGenreById } from "../db/queries.js";

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

const getGenre = (req, res) => {
  res.send("Show a genre.");
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
