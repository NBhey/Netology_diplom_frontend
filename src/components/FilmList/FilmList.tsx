import { useState, useEffect } from 'react';
import FilmCard from './FilmCard/FilmCard';
import './FilmList.css';
import { HEAD_REQUEST_API as URL } from "src/constants/index"

interface Film {
  id: number;
  film_name: string;
  film_duration: number;
  film_origin: string;
  film_poster: string;
  film_description: string;
}

interface Hall {
  id: number;
  hall_name: string;
  hall_rows:number;
  hall_places:number;
  hall_config:[];
}

interface Seance {
  id: number;
  seance_filmid: number;
  seance_hallid: number;
  seance_time: string;
}

interface ApiResponse {
  result: {
    films: Film[];
    halls: Hall [];
    seances: Seance[];
  };
}

const API_URL = process.env.REACT_APP_API_URL || `${URL}alldata`;

const FilmList: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        const data: ApiResponse = await response.json();
        setData(data);
      } catch (error) {
        console.log(error, 'запрос не удался');
      }
    }

    fetchData();
  }, []);

  return (
    <ul className="films-list">
      {data?.result.films.map((film) => {
        const filmSeances = data.result.seances.filter(
          (seance) => seance.seance_filmid === film.id,
        );
        return <FilmCard key={film.id} film={film} seances={filmSeances} halls={data?.result.halls}/>;
      })}
    </ul>
  );
};

export default FilmList;
