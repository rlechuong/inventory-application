import { getAllGames, getGameById, getGenresByGame, getPlatformsByGame } from "../db/queries.js";

const listGames = async (req, res, next) => {
  try {
    const games = await getAllGames();
    res.render("games", { games });
  } catch (err) {
    next(err);
  }
};

const newGame = (req, res) => {
  res.send("Show new game form.");
};

const createGame = (req, res) => {
  res.send("Submit new game form.");
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

const editGame = (req, res) => {
  res.send("Show edit game form.");
};

const updateGame = (req, res) => {
  res.send("Submit edit game form.");
};

const deleteGame = (req, res) => {
  res.send("Delete a game.");
};

export { listGames, newGame, createGame, getGame, editGame, updateGame, deleteGame };
