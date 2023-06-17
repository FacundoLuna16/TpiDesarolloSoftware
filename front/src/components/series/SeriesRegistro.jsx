import React from "react";
import { useForm } from "react-hook-form";

export default function SeriesRegistro({
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
                {...register("Titulo", {
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
                  "form-control " + (errors?.Titulo ? "is-invalid" : "")
                }
              />
              {errors?.Titulo && touchedFields.Titulo && (
                <div className="invalid-feedback">
                  {errors?.Titulo?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Director */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Director">
                Director<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Director", {
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
                  "form-control " + (errors?.Titulo ? "is-invalid" : "")
                }
              />
              {errors?.Titulo && touchedFields.Titulo && (
                <div className="invalid-feedback">
                  {errors?.Titulo?.message}
                </div>
              )}
            </div>
          </div>
          {/* campo Anio */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaAlta">
                Año<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("Anio", {
                  required: { message: "Anio es requerido" }
                })}
                className={
                  "form-control " + (errors?.Anio ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.Anio?.message}
              </div>
            </div>
          </div>

          {/* campo CantTemporadas */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="CantTemporadas">
                Cantidad De Temporadas<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("CantTemporadas", {
                  required: {
                    value: true,
                    message: "Cantidad De Temporadas es requerido",
                  },
                })}
                className={
                  "form-control" + (errors?.CantTemporadas ? " is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.CantTemporadas?.message}
              </div>
            </div>
          </div>

          {/* campo Episodios */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Episodios">
                Episodios<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                {...register("Episodios", {
                  required: { value: true, message: "Familia es requerido" },
                })}
                className={
                  "form-control " +
                  (errors?.Episodios ? "is-invalid" : "")
                }
              >
              </input>
              <div className="invalid-feedback">
                {errors?.IdArticuloFamilia?.message}
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
