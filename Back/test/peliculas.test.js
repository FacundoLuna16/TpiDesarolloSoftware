const request = require("supertest");
const app = require("../index")
const { random } = require('underscore');

const peliculaAlta = {
    titulo: "Titulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    director : "Los Wachoski",
    year : "2023-05-25",
    rating : 10
};

const peliculaModificada = {
    id: 1,
    titulo:  "Titulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    director : "Los Wachoski",
    year : 2000,
    rating : 10
};



describe("GET /api/peliculas", () => {
    it("deberia devolver todas las peliculas", async () => {
        const res = await request(app).get("/api/peliculas");
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdPelicula: expect.any(Number),
                    titulo: expect.any(String),
                    director: expect.any(String),
                    year: expect.any(String),
                    rating: expect.any(Number),
                }),
            ])
        );
    });
});

describe("GET /api/peliculas/:id", () => {
    it("deberia devolver todas las peliculas", async () => {
        const res = await request(app).get("/api/peliculas/1");
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
                expect.objectContaining({
                    IdPelicula: expect.any(Number),
                    titulo: expect.any(String),
                    director: expect.any(String),
                    year: expect.any(String),
                    rating: expect.any(Number),
                }),
        );
    });
});

describe("POST /api/peliculas", () => {
    it("should create a movie and return the newly created movie", async () => {
  
      // Send a request to create the movie
      const res = await request(app).post("/api/peliculas").send(peliculaAlta);
  
      // Check the response status code
      expect(res.statusCode).toEqual(200);
  
      // Check the response body
      expect(res.body).toEqual(
        expect.objectContaining({
          IdPelicula: expect.any(Number),
          titulo: peliculaAlta.titulo,
          director: peliculaAlta.director,
          year: peliculaAlta.year,
          rating: peliculaAlta.rating,
        })
      );
    });
  
    it("should return an error if a movie with the same title already exists", async () => {
      // Create a movie object with an existing title
      const existingMovieData = {
        titulo: "Forrest Gump",
        director: "Jane Smith",
        year: "2019",
        rating: 7,
      };
      await request(app).post("/api/peliculas").send(existingMovieData);
  
      // Send a request to create a movie with the existing title
      const res = await request(app).post("/api/peliculas").send(existingMovieData);
  
      // Check the response status code
      expect(res.statusCode).toEqual(409);
  
      // Check the error message in the response body
      expect(res.body).toEqual(
        expect.objectContaining({
          error: "Movie with the same title already exists",
        })
      );
    });
  });

describe("PUT /api/peliculas/:id", () => {
    it("debería actualizar los detalles de una película y devolver un estado de éxito", async () => {

      // Enviar una solicitud para actualizar la película
      const res = await request(app)
        .put(`/api/peliculas/1`)
        .send(peliculaModificada);
  
      // Comprobar el código de estado de respuesta
      expect(res.statusCode).toEqual(200);
    });
  
    it("debería devolver un error si el nuevo título de la película ya existe", async () => {

      // Enviar una solicitud para actualizar la película
      const res = await request(app)
        .put(`/api/peliculas/1`)
        .send(peliculaAlta);
  
      // Comprobar el código de estado de respuesta
      expect(res.statusCode).toEqual(409);
  
      // Comprobar el mensaje de error en el cuerpo de respuesta
      expect(res.body).toEqual(
        expect.objectContaining({
          message: "El nuevo título ya existe",
        })
      );
    });
  
    it("debería devolver un error 404 si el ID de la película no existe", async () => {
      // Intentar actualizar una película que no existe
      const datosPeliculaActualizada = {
        titulo: "Nueva película",
        director: "John Doe",
        year: "2022",
        rating: 8,
      };
  
      // Enviar una solicitud para actualizar la película
      const res = await request(app).put("/api/peliculas/123456").send(datosPeliculaActualizada);
  
      // Comprobar el código de estado de respuesta
      expect(res.statusCode).toEqual(404);
  
      // Comprobar el mensaje de error en el cuerpo de respuesta
      expect(res.body).toEqual(
        expect.objectContaining({
          message: "Película no encontrada",
        })
      );
    });
});
  

describe("DELETE /api/peliculas/:id", () => {
    it("deberia eliminar una pelicula y mostrar la que acaba de eliminar", async () => {
        // crear una pelicula , obtener el id y luego eliminarla
        const res1 = await request(app).post("/api/peliculas").send(peliculaAlta);
        console.log(res1.statusCode);
        const id = res1.body.IdPelicula;

        const res = await request(app).delete("/api/peliculas/" + random(1, 10));
        expect(res.statusCode).toEqual(200);
        /*expect(res.body).toEqual(
            expect.objectContaining({
              Borrado : {
                IdPelicula: expect.any(Number),
                titulo: expect.any(String),
                director: expect.any(String),
                year: expect.any(String),
                rating: expect.any(Number)
              }
            }),
        );*/
    });
  it("deberia devolver un error 400 si el ID de la pelicula no existe", async () => {
    // Intentar eliminar una pelicula que no existe
    const res = await request(app).delete("/api/peliculas/123456");
    expect(res.statusCode).toEqual(400);
  });
});