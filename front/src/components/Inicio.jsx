import React from "react";
import { Link } from "react-router-dom";

function Inicio() {
  return (
      <div className="mt-4 p-5 rounded" style={{backgroundColor:"lightgray"}} >
        <h1>Trabajo Practico Integrador</h1>
        <h2>Enunciado:</h2>
        <p>Realizar un ejercicio grupal en el repositorio de Gitlab. 
          El objetivo es implementar el frontend de una aplicación utilizando tecnologías HTML, 
          CSS mediante la librería React. </p>
        <p>
        Dicha aplicación web complementará el backend realizado previamente en la ejercitación grupal anterior, 
        análogamente cada integrante del grupo deberá hacer la interfaz web para permitir hacer 
        el Alta, Baja, Modificación y Consulta (ABMC=CRUD) de los recursos expuestos por la Api Rest o Web Api desarrollada. 
        </p>
        <p>
        Junto a la funcionalidad del ABMC, y para facilitar las consultas y/o modificaciones, 
        se deberá implementar una búsqueda filtrando al menos una propiedad tipo string del recurso y 
        mostrar el conjunto resultante de la misma a en una tabla.
        </p>        
      </div>
  );
}

export { Inicio };
