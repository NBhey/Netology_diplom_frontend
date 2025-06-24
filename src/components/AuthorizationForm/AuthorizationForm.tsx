import { useForm } from 'react-hook-form';
import './AuthorizationForm.css';
type FormData = {
  email: string;
  password: string;
};

const AuthorizationForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <form className="authorization-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="authorization-form__title">Авторизация</h3>
      <div className="authorization-form__input-wrapper">
        <p>E-mail</p>
        <input type="text" placeholder="example@domain.xyz" {...register('email')} />
        <p>Пароль</p>
        <input type="password" placeholder="Пароль" {...register('password')} />
        <button type="submit">Авторизоваться</button>
      </div>
    </form>
  );
};

export default AuthorizationForm;
