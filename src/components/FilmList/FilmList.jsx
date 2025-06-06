import React, { useEffect, useState } from "react";
import FilmCard from "./FilmCard/FilmCard";
import "./FilmList.css"
const FilmList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://shfe-diplom.neto-server.ru/alldata"
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error, "запрос не удался");
      }
    }

    fetchData();
  }, []);

  return (
    <ul className="films-content">
      {data?.result.films.map((el)=>{
        const filmSeances = data.result.seances.filter(
        (seance) => seance.seance_filmid === el.id
      );
      return <FilmCard key={el.id} props={el} seances={filmSeances}/>
})}
    </ul>
  );
};

export default FilmList;
