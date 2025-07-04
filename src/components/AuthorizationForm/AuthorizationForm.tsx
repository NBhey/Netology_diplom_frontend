import { useForm } from 'react-hook-form';
import './AuthorizationForm.css';
import { api } from '../../api/api';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

type FormData = {
  email: string;
  password: string;
};

const EMAIL = 'shfe-diplom@netology.ru';
const PASSWORD = 'shfe-diplom';

const AuthorizationForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem('admin')) {
      navigate('/admin');
    }
  });
  
  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/login', data);
      if (data.email === EMAIL && data.password === PASSWORD) {
        window.sessionStorage.setItem('admin', EMAIL);
        navigate('/admin');
      } else {
        throw Error;
      }
      reset();
    } catch (error) {
      console.log('Ошибка', error);
    }
  };
  return (
    <form className="authorization-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="authorization-form__title">Авторизация</h3>
      <div className="authorization-form__input-wrapper">
        <label>
          <p>E-mail</p>
          <input type="text" placeholder="example@domain.xyz" {...register('email')} />
        </label>
        <label>
          <p>Пароль</p>
          <input type="password" placeholder="Пароль" {...register('password')} />
        </label>
        <button className="btn authorization-form__btn" type="submit">
          Авторизоваться
        </button>
      </div>
    </form>
  );
};

export default AuthorizationForm;
