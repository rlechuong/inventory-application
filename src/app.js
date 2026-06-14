import "dotenv/config";
import express from "express";
import path from "node:path";
import { gamesRouter } from "./routes/games.js";
import { genresRouter } from "./routes/genres.js";
import { platformsRouter } from "./routes/platforms.js";
import { renderIndex } from "./controllers/indexController.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(import.meta.dirname, "..", "public")));

app.get("/", renderIndex);

app.use("/games", gamesRouter);

app.use("/genres", genresRouter);

app.use("/platforms", platformsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
