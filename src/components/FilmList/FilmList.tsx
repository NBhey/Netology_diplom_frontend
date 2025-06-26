import { useState, useEffect } from 'react';
import FilmCard from './FilmCard/FilmCard';
import './FilmList.css';
import {api} from '../../api/api'
import { ApiResponse } from '../../types/apiType';

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
