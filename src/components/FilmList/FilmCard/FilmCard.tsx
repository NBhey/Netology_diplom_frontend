import './FilmCard.css';

interface Film {
  id: number;
  film_name: string;
  film_duration: number;
  film_origin: string;
  film_poster: string;
  film_description: string;
}

interface Seance {
  id: number;
  seance_filmid: number;
  seance_hallid: number;
  seance_time: string;
}

interface FilmCardProps {
  film: Film;
  seances?: Seance[];
}

const FilmCard: React.FC<FilmCardProps> = ({ film, seances }) => {
  const { film_description, film_duration, film_name, film_origin, film_poster, id } = film;
  const film_origin_Upper_and_Slice = film_origin[0].toLocaleUpperCase() + film_origin.slice(1).toLowerCase();
  
  return (
    <li className="film-card">
      <div className="film-card__main-content">
        <img className="film-card__image" src={film_poster} alt="постер" />
        <div className="film-card__title">
          <h3> {film_name} </h3>
          <p className='film-card__title_description'>{film_description}</p>
          <p className='film-card__title_duration'>{film_duration} минут {film_origin_Upper_and_Slice}</p>
        </div>
      </div>
      <div>
        {seances?.length
          ? seances.map((seance) => <span key={seance.id}>{seance.seance_time}</span>)
          : 'Cеансы отсутствуют'}
      </div>
    </li>
  );
};

export default FilmCard;
