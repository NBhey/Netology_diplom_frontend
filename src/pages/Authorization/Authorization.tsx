import './Authorization.css';
import AuthorizationForm from '../../components/AuthorizationForm/AuthorizationForm';
import Header from '../../components/Header/Header';

const Authorization: React.FC = () => {
  return (
    <main className="authorization">
      <div className="authorization-container">
        <Header />
        <AuthorizationForm />
      </div>
    </main>
  );
};

export default Authorization;
