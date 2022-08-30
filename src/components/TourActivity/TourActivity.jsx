import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postTourActivity, getOnlyCountries } from "../../redux/actions";
import "./TourActivity.css";

function validate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Se requiere el nombre de la actividad";
  }
  if (!input.duration) {
    error.duration = "Se requiere la duración";
  }
  return error;
}

export default function TourActivity() {
  const dispatch = useDispatch();
  const onlyCountries = useSelector((state) => state.onlyCountries);

  const [error, setError] = useState({
    name: "Se requiere el nombre de la actividad",
    duration: "",
  });

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });

  useEffect(() => {
    dispatch(getOnlyCountries());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    setInput({
      ...input,
      season: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      country: [...input.country, e.target.value],
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(el) {
    setInput({
      ...input,
      country: input.country.filter((oc) => oc !== el),
    });
  }

  function handleSubmit(e) {
    dispatch(postTourActivity(input));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      country: [],
    });
    alert("Se creó la actividad");

    // antes estaba acá el GET BACK QUE DEPENDÍA DEL USENAVIGATE
  }

  return (
    <div style={{ backgroundColor: "#faf0e6" }}>
      <h3>Creación de actividad turística</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Actividad turística:&nbsp;</label>
          <input
            value={input.name}
            type="text"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {error.name && (
            <p style={{ display: "inline", color: "red" }}>{error.name}</p>
          )}
          {/* lo anterior es el error que va a aparecer en caso de que haya uno */}
        </div>

        {/* //////////////// ver la manera de ponerle una validacion a este campo porque me crea la actividad igual sin que ponga nada */}
        <div>
          {/* <label>Dificultad:&nbsp;</label> 
          |
          <input
            type="radio"
            value="1"
            name="difficulty"
            onChange={(e) => handleChange(e)}
          />
          1|
          <input
            type="radio"
            value="2"
            name="difficulty"
            onChange={(e) => handleChange(e)}
          />
          2|
          <input
            type="radio"
            value="3"
            name="difficulty"
            onChange={(e) => handleChange(e)}
          />
          3|
          <input
            type="radio"
            value="4"
            name="difficulty"
            onChange={(e) => handleChange(e)}
          />
          4|
          <input
            type="radio"
            value="5"
            name="difficulty"
            onChange={(e) => handleChange(e)}
          />
          5| 
          {!input.difficulty && (
            <p style={{ display: "inline", color: "red" }}>Ingrese una dificultad</p>
          )} */}
          <label>Dificultad:&nbsp;</label>
          <select onChange={(e)=>handleChange(e)} name="difficulty">
          <option disable hidden>
              Seleccione
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            {input.difficulty === "" && (
            <p style={{ display: "inline", color: "red" }}>Ingrese una dificultad</p>
          )}
          </select>
        </div>
        <div>
          <label className="labeled">Duración:&nbsp;</label>
          <input
            type="text"
            name="duration"
            placeholder="Tiempo en horas"
            onChange={(e) => handleChange(e)}
          />
          {error.duration && (
            <p style={{ display: "inline", color: "red" }}>{error.duration}</p>
          )}
        </div>

        <div>
          <label>Temporada:&nbsp;</label>
          <select onChange={(e) => handleCheck(e)}>
            <option disable hidden>
              Temporada
            </option>
            <option value="summer">Verano</option>
            <option value="autumn">Otoño</option>
            <option value="winter">Invierno</option>
            <option value="spring">Primavera</option>
          </select>
        </div>

        <div>
          <label>
            Paises:
            <select onChange={(e) => handleSelect(e)}>
              <option disable hidden></option>
              {onlyCountries.map((oc) => (
                <option key={oc.name} value={oc.name}>
                  {oc.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {input.country.map((el) => (
          <div key={el}>
            <h4>{el}</h4>
            <button onClick={() => handleDelete(el)}>X</button>
          </div>
        ))}
        <br />
        <div>
          <button
            type="submit"
            disabled={error.name || error.duration || !input.difficulty ? true : false}
          >
            Crear
          </button>
        </div>
      </form>
      <div className="back">
        <br />
        <Link to="/home">⬅ Regresar</Link>
      </div>
      <br />
    </div>
  );
}
