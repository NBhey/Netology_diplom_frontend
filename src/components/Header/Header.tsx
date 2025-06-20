import { Link } from 'react-router';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-wrapper">
        <h1 className="header__title">
          идём<span className="header__title_weight">в</span>кино
        </h1>
        <Link to="/authorization">
          <button className="header__btn">войти</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
