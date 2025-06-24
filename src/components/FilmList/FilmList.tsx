import { useState, useEffect } from 'react';
import FilmCard from './FilmCard/FilmCard';
import './FilmList.css';
import {api} from '../../api/api'


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

const FilmList: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  
  useEffect(() => {
    
    async function fetchData() {
     try {
        const response = await api.get<ApiResponse>('/alldata');
        setData(response);
      } catch (err) {
        console.log(err);
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
