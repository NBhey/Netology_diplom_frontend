import { Fragment } from 'react/jsx-runtime';
import './FilmCard.css';
// TODO Вынести в файл с типами или удалить, в общем и целом обрати на это внимание 
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
  hall_rows: number;
  hall_places: number;
  hall_config: Array<Array<string>>;
}

interface Seance {
  id: number;
  seance_filmid: number;
  seance_hallid: number;
  seance_time: string;
}

interface FilmCardProps {
  film: Film;
  halls: Hall[];
  seances: Seance[];
}

const FilmCard: React.FC<FilmCardProps> = ({ film, seances, halls }) => {
  const { film_description, film_duration, film_name, film_origin, film_poster } = film;

  const film_origin_Upper_and_Slice =
    film_origin[0].toLocaleUpperCase() + film_origin.slice(1).toLowerCase();

  const currentHallsObject: { [key: string]: any } = {};

  halls.forEach((hall) => {
    seances.forEach((seance) => {
      if (hall.id === seance.seance_hallid) {
        if (currentHallsObject[hall.hall_name]) {
          currentHallsObject[hall.hall_name].push(seance.seance_time);
        } else {
          currentHallsObject[hall.hall_name] = [seance.seance_time];
        }
      }
    });
  });

  const currentHallsKeyArrays = Object.keys(currentHallsObject);
  return (
    <li className="film-card">
      <div className="film-card__main-content">
        <img className="film-card__image" src={film_poster} alt="постер" />
        <div className="film-card__title">
          <h3> {film_name} </h3>
          <p className="film-card__title_description">{film_description}</p>
          <p className="film-card__title_duration">
            {film_duration} минут {film_origin_Upper_and_Slice}
          </p>
        </div>
      </div>
      <div>
        <div className="film-card__hall">
          {currentHallsKeyArrays.length
            ? currentHallsKeyArrays.map((key, i) => {
                return (
                  <Fragment key={i}>
                    <h3 className="film-card__hall-title"> {key[0].toLocaleUpperCase() + key.slice(1).toLowerCase()} </h3>
                    <div>
                      {currentHallsObject[key].map((time: string, key: number) => {
                        return (
                          <span className="film-card__hall-time" key={key}>
                            {time}
                          </span>
                        );
                      })}
                    </div>
                  </Fragment>
                );
              })
            : <p>Cеансы отсутствуют</p>}
        </div>
      </div>
    </li>
  );
};

export default FilmCard;
