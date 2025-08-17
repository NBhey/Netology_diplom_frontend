import { render, screen } from '@testing-library/react';
import FilmCard from './FilmCard';
import '@testing-library/jest-dom';

describe('FilmCard component', () => {
  const mockFilm = {
    id: 1,
    film_name: 'Test Film',
    film_duration: 120,
    film_origin: 'usa',
    film_poster: 'test-poster.jpg',
    film_description: 'This is a test film description'
  };

  const mockHalls = [
    {
      id: 1,
      hall_name: 'hall 1',
      hall_rows: 10,
      hall_places: 100,
      hall_config: []
    },
    {
      id: 2,
      hall_name: 'hall 2',
      hall_rows: 8,
      hall_places: 80,
      hall_config: []
    }
  ];

  const mockSeances = [
    {
      id: 1,
      seance_filmid: 1,
      seance_hallid: 1,
      seance_time: '10:00'
    },
    {
      id: 2,
      seance_filmid: 1,
      seance_hallid: 1,
      seance_time: '12:00'
    },
    {
      id: 3,
      seance_filmid: 1,
      seance_hallid: 2,
      seance_time: '14:00'
    }
  ];

  test('renders film information correctly', () => {
    render(<FilmCard film={mockFilm} halls={[]} seances={[]} />);
    
    expect(screen.getByText(mockFilm.film_name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.film_description)).toBeInTheDocument();
    expect(screen.getByText(`${mockFilm.film_duration} минут Usa`)).toBeInTheDocument();
    expect(screen.getByAltText('постер')).toHaveAttribute('src', mockFilm.film_poster);
  });

  test('shows "Сеансы отсутствуют" when no seances available', () => {
    render(<FilmCard film={mockFilm} halls={[]} seances={[]} />);
    expect(screen.getByText('Cеансы отсутствуют')).toBeInTheDocument();
  });

  test('renders seances grouped by halls correctly', () => {
    render(<FilmCard film={mockFilm} halls={mockHalls} seances={mockSeances} />);
    
    expect(screen.getByText('Hall 1')).toBeInTheDocument();
    expect(screen.getByText('Hall 2')).toBeInTheDocument();
    
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('14:00')).toBeInTheDocument();
  });

  test('formats hall names correctly (capital first letter)', () => {
    const hallWithLowercaseName = {
      id: 3,
      hall_name: 'small hall',
      hall_rows: 5,
      hall_places: 50,
      hall_config: []
    };
    
    const seanceForSmallHall = {
      id: 4,
      seance_filmid: 1,
      seance_hallid: 3,
      seance_time: '16:00'
    };
    
    render(
      <FilmCard 
        film={mockFilm} 
        halls={[...mockHalls, hallWithLowercaseName]} 
        seances={[...mockSeances, seanceForSmallHall]} 
      />
    );
    
    expect(screen.getByText('Small hall')).toBeInTheDocument();
  });
});