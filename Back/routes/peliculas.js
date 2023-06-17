
const { Router }  = require('express');
const db = require("../base-ORM/sequelize-init");
const router = new Router();
const {Op} = require("sequelize");

router.get("/", async (req, res) => {
  try{
    let where = {};
    // Si se envía el parámetro "titulo" en la query string, filtramos por ese título
    if (req.query.titulo) {
      where.titulo = {
        [Op.like]: "%" + req.query.titulo + "%",
        };
    }
    let data = await db.peliculas.findAndCountAll({
      order: [["IdPelicula", "ASC"]],
      where,
    });
    res.json(data.rows);
  }catch (err) {
    console.log(err);
    res.status(500).send("Ha ocurrido un error.");
  }
});


router.get("/:id", async (req, res) => {
  let item = await db.peliculas.findOne({
    where: { IdPelicula: req.params.id}
  });
  res.json({ item });
});

router.post("/", async (req, res) => {
  try {
    const existingMovie = await db.peliculas.findOne({
      where: {
        titulo: req.body.titulo,
      },
    });

    if (existingMovie) {
      // If a movie with the same title already exists, return an error response
      return res.status(409).json({ error: "Movie with the same title already exists" });
    }

    const newMovie = await db.peliculas.create({
      titulo: req.body.titulo,
      director: req.body.director,
      year: req.body.year,
      rating: req.body.rating,
    });

    res.status(200).json(newMovie.dataValues); // Return the newly added record
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    let movie = await db.peliculas.findOne({
      where: { IdPelicula: movieId },
    });

    if (!movie) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }

    const newTitle = req.body.titulo;

    if (newTitle !== movie.titulo) {
      const existingMovie = await db.peliculas.findOne({
        where: { titulo: newTitle },
      });

      if (existingMovie) {
        res.status(409).json({ message: "El nuevo título ya existe" });
        return;
      }
    }

    movie.titulo = newTitle;
    movie.director = req.body.director;
    movie.year = req.body.year;
    movie.rating = req.body.rating;

    await movie.save()
    res.sendStatus(200);
  } catch (error) {
    throw error;
  }
});
// Con el método DELETE, borramos un registro de la tabla
router.delete("/:id", async (req, res) => {
  try {
    let data = await db.peliculas.findOne({
      where : { IdPelicula: req.params.id }
    })
    let filasBorradas = await db.peliculas.destroy({
      where : { IdPelicula: req.params.id }
    });
    if (filasBorradas == 1) res.status(200).json({Borrado : data});
    else res.sendStatus(400)
  } catch(error) {
    throw error;
  }
});

module.exports = router;
