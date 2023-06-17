const express = require("express");
const router = express.Router();
const db = require("../base-ORM/sequelize-init");
const {Op} = require("sequelize");

router.get("/", async function (req, res, next) {
  try {
    let where = {};
    // Si se envía el parámetro "titulo" en la query string, filtramos por ese título
    if (req.query.Titulo) {
      where.Titulo = {
        [Op.like]: "%" + req.query.Titulo + "%",
        };
;
    }
    let data = await db.series.findAndCountAll({
      attributes: [
        "IdSerie",
        "Titulo",
        "Director",
        "Anio",
        "CantTemporadas",
        "Episodios",
      ],
      order: [["IdSerie", "ASC"]],
      where,
    });
    res.json(data.rows);

  } catch (err) {
    console.log(err);
    res.status(500).send("Ha ocurrido un error.");
  }
});

// Método get para obtener un registro por id
router.get("/:id", async function (req, res, next) {
  try {
    // Buscamos el registro por id
    let item = await db.series.findOne({
      where: { IdSerie: req.params.id }
    });
    // Mostramos el registro
    res.json({ item });
  } catch (err) {
    console.log(err);
    res.status(500).send("Ha ocurrido un error.");
  }
});

// Método post para agregar un registro de las series
router.post("/", async function (req, res, next) {
  try {
    let data = await db.series.create({
      Titulo: req.body.Titulo,
      Director: req.body.Director,
      Anio: req.body.Anio,
      CantTemporadas: req.body.CantTemporadas,
      Episodios: req.body.Episodios
    });
    res.status(200).json(data.dataValues);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    let data = await db.series.findOne({
      where: { IdSerie: req.params.id }
    });
    if (!data) {
      res.status(404).json({ message: "Serie no encontrada" });
      return;
    }
    data.Titulo = req.body.Titulo;
    data.Director = req.body.Director;
    data.Anio = req.body.Anio;
    data.CantTemporadas = req.body.CantTemporadas;
    data.Episodios = req.body.Episodios;
    await data.save();
    res.status(200).json({ message: "Serie actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la serie" });
  }
});

// Método delete para eliminar un registro de las series
router.delete("/:id", async function (req, res, next) {
  try {
    let data = await db.series.findOne({
      where: { IdSerie: req.params.id }
    });
    if (!data) {
      res.status(404).json({ message: "Serie no encontrada" });
      return;
    }
    await data.destroy();
    res.sendStatus(200);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
