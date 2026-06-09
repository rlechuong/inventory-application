const listPlatforms = (req, res) => {
  res.send("List all platforms.");
};

const newPlatform = (req, res) => {
  res.send("Show new platform form.");
};

const createPlatform = (req, res) => {
  res.send("Submit new platform form.");
};

const getPlatform = (req, res) => {
  res.send("Show a platform.");
};

const editPlatform = (req, res) => {
  res.send("Show edit platform form.");
};

const updatePlatform = (req, res) => {
  res.send("Submit edit platform form.");
};

const deletePlatform = (req, res) => {
  res.send("Delete a platform.");
};

export {
  listPlatforms,
  newPlatform,
  createPlatform,
  getPlatform,
  editPlatform,
  updatePlatform,
  deletePlatform,
};
