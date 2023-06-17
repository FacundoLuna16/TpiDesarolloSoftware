import React from "react";
import { useForm } from "react-hook-form";

export default function PeliculasRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };
  console.log(Item);
  if (!Item) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo Titulo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Titulo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("titulo", {
                  required: { value: true, message: "Titulo es requerido" },
                  minLength: {
                    value: 4,
                    message: "Titulo debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Titulo debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.titulo ? "is-invalid" : "")
                }
              />
              {errors?.titulo && touchedFields.titulo && (
                <div className="invalid-feedback">
                  {errors?.titulo?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Director */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="director">
                Director<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("director", {
                  required: { value: true, message: "Director es requerido" },
                  minLength: {
                    value: 4,
                    message: "Director debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Director debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.director ? "is-invalid" : "")
                }
              />
              {errors?.director && touchedFields.director && (
                <div className="invalid-feedback">
                  {errors?.director?.message}
                </div>
              )}
            </div>
          </div>
          {/* campo year */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaAlta">
                Año<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("year", {
                  required: { message: "Anio es requerido" }
                })}
                className={
                  "form-control " + (errors?.year ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.year?.message}
              </div>
            </div>
          </div>

          {/* campo Rating */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Rating">
                Rating<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("rating", {
                  required: {
                    value: true,
                    message: "Rating es requerido",
                  },
                })}
                className={
                  "form-control" + (errors?.rating ? " is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.rating?.message}
              </div>
            </div>
          </div>
        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}
