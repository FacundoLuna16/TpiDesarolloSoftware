const request = require("supertest");
const app = require("../index");
const { random } = require("underscore");

const climaAlta = {
  Maxima: 30,
  Minima: 20,
  Fecha: "2021-10-10",
  Lluvia: "SI",
  Humedad: 10,
};

const climaModif = {
  Maxima: 32,
  Minima: 22,
  Fecha: "2019-05-10",
  Lluvia: "SI",
  Humedad: 18,
};

describe("GET /api/climas", () => {
  it("deberia devolver todos los pronosticos", async () => {
    const res = await request(app)
      .get("/api/climas")
      .set("Accept", "application/json");
    expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdClima: expect.any(Number),
          Maxima: expect.any(Number),
          Minima: expect.any(Number),
          Fecha: expect.any(String),
          Lluvia: expect.any(String),
          Humedad: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET /api/climas/:id", () => {
  it("deberia devolver un pronostico", async () => {
    const res = await request(app).get("/api/climas/3");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdClima: expect.any(Number),
        Maxima: expect.any(Number),
        Minima: expect.any(Number),
        Fecha: expect.any(String),
        Lluvia: expect.any(String),
        Humedad: expect.any(Number),
      })
    );
  });
});

describe("POST /api/climas", () => {
  it("deberia crear un pronostico", async () => {
    const res = await request(app).post("/api/climas").send(climaAlta);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdClima: expect.any(Number),
        Maxima: expect.any(Number),
        Minima: expect.any(Number),
        Fecha: expect.any(String),
        Lluvia: expect.any(String),
        Humedad: expect.any(Number),
      })
    );
  });
});

describe("PUT /api/climas/:id", () => {
  it("deberia modificar un pronostico", async () => {
    const res = await request(app)
      .put("/api/climas/2")
      .send(climaModif);
    expect(res.status).toEqual(200);
  });
});

describe("DELETE /api/climas/:id", () => {
  it("deberia borrar un pronostico", async () => {
    const res = await request(app)
    .delete("/api/climas/" + random(1,10));
    expect(res.status).toEqual(200);
  });
});
