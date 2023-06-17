const express  = require('express');
const db = require("../base-ORM/sequelize-init");
const router = express.Router()

router.get("/", async (req, res) => {
  try {
    let data = await db.jugadores.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los jugadores" });
  }
});


router.get("/:id", async (req, res) => {
  let item = await db.jugadores.findOne({
    where: { idJugador: req.params.id}
  });
  if (!item) {
    res.status(404).json({ message: "Jugador no encontrado" });
    return;
  }
  res.json({ item: item.toJSON() });
});

router.post("/", async (req, res) => {
  try {
    let data = await db.jugadores.create({
      nombre: req.body.nombre,
      pais: req.body.pais,
      fechaNacimiento: req.body.fechaNacimiento,
      eloMax: req.body.eloMax,
      fechaEloMax: req.body.fechaEloMax
    });
    res.status(200).json(data.dataValues);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (req, res) => {
  try {
    let data = await db.jugadores.findOne({
      where : { idJugador: req.params.id }
    });
    
    if (!data) { 
        res.status(404).json({ message: "Jugador no encontrado" });
        return;
      }
    data.nombre = req.body.nombre,
    data.pais = req.body.pais,
    data.fechaNacimiento = req.body.fechaNacimiento,
    data.eloMax = req.body.eloMax,
    data.fechaNacimiento = req.body.fechaEloMax
    await data.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar al jugador" });
    }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let data = await db.jugadores.findOne({
      where : { idJugador: req.params.id }
    });
    if (!data) {
      res.status(404).json({ message: "Jugador no encontrado" });
      return;
    }
    await data.destroy();
    res.sendStatus(200);
  } catch (error) {
    throw error;
  }
});

module.exports = router;