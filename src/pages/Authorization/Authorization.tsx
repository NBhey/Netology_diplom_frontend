import { useLocation } from 'react-router';
import './Authorization.css';
import AuthorizationForm from '../../components/AuthorizationForm/AuthorizationForm';
import Header from '../../components/HeaderMain/Header';

const Authorization: React.FC = () => {
  const location = useLocation();
  console.log(location);
  return (
    <main className="authorization">
      <Header />
      <AuthorizationForm />
    </main>
  );
};

export default Authorization;
