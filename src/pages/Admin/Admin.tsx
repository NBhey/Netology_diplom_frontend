import ManagmentHall from '../../components/ManagmentHall/ManagmentHall';
import Header from '../../components/Header/Header';
import './Admin.css';
import ConfigurateHall from '../../components/ConfigurateHall/ConfigurateHall';
import { HallsProvider } from '../../contexts/HallsContext';

const Admin: React.FC = () => {
  return (
    <main className="admin">
      <div className="admin-container">
        <Header />
        <HallsProvider>
          <div className="hall-params">
            <ManagmentHall />
            <ConfigurateHall />
          </div>
        </HallsProvider>
      </div>
    </main>
  );
};

export default Admin;
