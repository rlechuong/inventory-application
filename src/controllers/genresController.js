import { validationResult, matchedData } from "express-validator";
import { NotFoundError } from "../errors/NotFoundError.js";
import {
  getAllGenres,
  getGenreById,
  getGamesByGenre,
  createGenreQuery,
  updateGenreQuery,
  deleteGenreQuery,
} from "../db/queries.js";

const listGenres = async (req, res, next) => {
  try {
    const genres = await getAllGenres();
    res.render("genres", { genres });
  } catch (err) {
    next(err);
  }
};

const newGenre = (req, res) => {
  res.render("genreForm", {
    errors: [],
    value: "",
    action: "/genres",
    heading: "New Genre",
    buttonText: "Create Genre",
    backUrl: "/genres",
  });
};

const createGenre = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("genreForm", {
      errors: errors.array(),
      value: req.body.name,
      action: "/genres",
      heading: "New Genre",
      buttonText: "Create Genre",
      backUrl: "/genres",
    });
  }

  const { name } = matchedData(req);
  try {
    await createGenreQuery(name);
    res.redirect("/genres");
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).render("genreForm", {
        errors: [{ msg: "A genre with that name already exists." }],
        value: name,
        action: "/genres",
        heading: "New Genre",
        buttonText: "Create Genre",
        backUrl: "/genres",
      });
    }
    next(err);
  }
};

const getGenre = async (req, res, next) => {
  const { id } = req.params;
  try {
    const genre = await getGenreById(id);
    if (!genre) {
      return next(new NotFoundError("Genre not found."));
    }
    const games = await getGamesByGenre(id);
    res.render("genre", { genre, games });
  } catch (err) {
    next(err);
  }
};

const editGenre = async (req, res, next) => {
  const { id } = req.params;
  try {
    const genre = await getGenreById(id);
    if (!genre) {
      return next(new NotFoundError("Genre not found."));
    }
    res.render("genreForm", {
      errors: [],
      value: genre.name,
      action: `/genres/${id}`,
      heading: "Edit Genre",
      buttonText: "Update Genre",
      backUrl: `/genres/${id}`,
    });
  } catch (err) {
    next(err);
  }
};

const updateGenre = async (req, res, next) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("genreForm", {
      errors: errors.array(),
      value: req.body.name,
      action: `/genres/${id}`,
      heading: "Edit Genre",
      buttonText: "Update Genre",
      backUrl: `/genres/${id}`,
    });
  }

  const { name } = matchedData(req);
  try {
    const genre = await getGenreById(id);
    if (!genre) {
      return next(new NotFoundError("Genre not found."));
    }
    await updateGenreQuery(id, name);
    res.redirect(`/genres/${id}`);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).render("genreForm", {
        errors: [{ msg: "A genre with that name already exists." }],
        value: name,
        action: `/genres/${id}`,
        heading: "Edit Genre",
        buttonText: "Update Genre",
        backUrl: `/genres/${id}`,
      });
    }
    next(err);
  }
};

const deleteGenre = async (req, res, next) => {
  const { id } = req.params;
  try {
    const genre = await getGenreById(id);
    if (!genre) {
      return next(new NotFoundError("Genre not found."));
    }
    await deleteGenreQuery(id);
    res.redirect("/genres");
  } catch (err) {
    next(err);
  }
};

export { listGenres, newGenre, createGenre, getGenre, editGenre, updateGenre, deleteGenre };
