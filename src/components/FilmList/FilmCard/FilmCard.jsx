import React from "react";

import "./FilmCard.css"

const FilmCard = ({ props }) => {
  console.log(props, "Filmcard");

  return (
    <div>
        <div className="film-title">
            <img src={props.film_poster} alt="постер" />
            <div className="title">
                <h3> </h3>
                <p></p>
                <p></p>
            </div>
            
        </div>
        <div>
            
        </div>
      
    </div>
  );
};

export default FilmCard;
