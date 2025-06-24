import { Link, useLocation } from 'react-router';
import './Header.css';

interface LocationData {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: null;
}

const Header: React.FC = () => {
  const location: LocationData = useLocation();
  console.log(location);

  return location.pathname === '/authorization' ? (
    <header className="header">
      <div className="header-wrapper header-wrapper_admin">
        <h1 className="header__title">
          идём<span className="header__title_weight">в</span>кино 
        </h1>
        <h3>Администратовская</h3>
      </div>
    </header>
  ) : (
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
