import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { ApiResponse } from '@/types/apiType';
import './ManagmentHall.css';
import image from './img/after.png';

const ManagmentHall: React.FC = () => {
  const [halls, setHall] = useState<string[] | null>(null);
  const [arrowContent, setArrowContent] = useState<boolean>(false);
  const [modalWindow, setModalWindow] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      const {
        result: { halls },
      } = await api.get<ApiResponse>('/alldata');

      const data = halls.reduce((acc, element) => {
        acc.push(element.hall_name);
        return acc;
      }, [] as string[]);
      setHall(data);
    }
    getData();
  }, []);

  const handleClickForOpenHallConfig = (event: React.MouseEvent<HTMLImageElement>) => {
    setArrowContent(!arrowContent);
  };

  const handleAddNewHall = () => {
   setModalWindow(!modalWindow)
  };

  return (
    <section className="hall-params__managment">
      <div className="hall-params__title">
        <h3>Управление залами</h3>
        <img
          className={arrowContent ? 'hall-params__img' : 'hall-params__img_rotate'}
          onClick={handleClickForOpenHallConfig}
          src={image}
          alt="стрелка"
        />
      </div>
      {arrowContent ? (
        <div className="hall-params__configurate">
          <p>Доступные залы:</p>
          <ul className="hall-params__list">
            {halls?.map((hall, i) => {
              return <li key={i}> - {hall}</li>;
            })}
          </ul>
          <button onClick={handleAddNewHall}> Создать зал </button>
        </div>
      ) : null}
      {modalWindow ? (
        <form action="">
          <label htmlFor="hall">
            <input name="hall" type="text" placeholder="Например: Зал 1" />
          </label>
        </form>
      ) : null}
    </section>
  );
};

export default ManagmentHall;
