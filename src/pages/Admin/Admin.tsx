import ManagmentHall from '../../components/ManagmentHall/ManagmentHall';
import Header from '../../components/Header/Header';
import './Admin.css';
import ConfigurateHall from '../../components/ConfigurateHall/ConfigurateHall';

const Admin: React.FC = () => {
  return (
    <main className="admin">
      <div className="admin-container">
        <Header />
        <div className="hall-params">
            <ManagmentHall/>
            <ConfigurateHall/>
        </div>
      </div>
    </main>
  );
};

export default Admin;
