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
  console.log(seances, 'seance');
  console.log(film, 'film');

  return (
    <li>
      <div className="film-title">
        <img src={film.film_poster} alt="постер" />
        <div className="title">
          <h3> {film.film_name} </h3>
          <p>{film.film_description}</p>
          <p>{film.film_duration}</p>
        </div>
      </div>
      <div> {seances?.map((seance) => <span key={seance.id}>{seance.seance_time}</span>)} </div>
    </li>
  );
};

export default FilmCard;
