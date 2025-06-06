import React, { useEffect } from "react";

import "./FilmCard.css"

const FilmCard = ({ props, seances }) => {
  console.log(seances, "Filmcard");

 
  return (
    <li >
        <div className="film-title">
            <img src={props.film_poster} alt="постер" />
            <div className="title">
                <h3> {props.film_name} </h3>
                <p>{props.film_description}</p>
                <p>{props.film_duration}</p>
            </div>
        </div>
        <div>
           {seances[0]?.seance_time || null}
        </div>
      
    </li>
  );
};

export default FilmCard;
