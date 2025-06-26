import Header from '../../components/Header/Header';
import Calendar from '../../components/Calendar/Calendar';
import './Main.css';
import FilmList from '../../components/FilmList/FilmList';

const Main: React.FC = () => {
  return (
    <main className="main">
      <div className="main-container">
        <Header />
        <Calendar />
        <FilmList />
      </div>
    </main>
  );
};

export default Main;
