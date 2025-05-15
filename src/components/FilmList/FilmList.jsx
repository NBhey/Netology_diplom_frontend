import React, { useEffect, useState } from "react";
import FilmCard from "./FilmCard/FilmCard";

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
    console.log("useEffect отработал");

    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      {data?.result.films.map((el)=>(
        <FilmCard props={data.result.films}/>
    ))}
    </>
  );
};

export default FilmList;
