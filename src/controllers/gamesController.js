const listGames = (req, res) => {
  res.send("List all games.");
};

const newGame = (req, res) => {
  res.send("Show new game form.");
};

const createGame = (req, res) => {
  res.send("Submit new game form.");
};

const getGame = (req, res) => {
  res.send("Show a game.");
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
