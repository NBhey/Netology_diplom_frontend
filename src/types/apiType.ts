export interface Film {
  id: number;
  film_name: string;
  film_duration: number;
  film_origin: string;
  film_poster: string;
  film_description: string;
}

export interface Hall {
  id: number;
  hall_name: string;
  hall_rows: number;
  hall_places: number;
  hall_config: Array<Array<string>>;
  hall_open: number;
  hall_price_standart: number;
  hall_price_vip: number;
}

export interface Seance {
  id: number;
  seance_filmid: number;
  seance_hallid: number;
  seance_time: string;
}

export interface ApiResponse {
  result: {
    films: Film[];
    halls: Hall[];
    seances: Seance[];
  };
}

export interface inputHeaderForSectionInAdminPanel {
  title: string;
  arrowContent: boolean;
  handleCLick: (event: React.MouseEvent<HTMLImageElement>) => void;
}

export interface HallsContextType  {
  halls: Array<Hall> | [];
  setHalls: React.Dispatch<React.SetStateAction<Hall[]>>;
};
