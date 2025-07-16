import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '../../api/api';
import { ApiResponse } from '@/types/apiType';
import './ManagmentHall.css';
import HeaderForSectionInAdminPanel from '../HeaderForSectionInAdminPanel/HeaderForSectionInAdminPanel';
import { useHalls } from '../../contexts/HallsContext';

const ManagmentHall: React.FC = () => {
  const [arrowContent, setArrowContent] = useState<boolean>(false);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { halls, setHalls } = useHalls();

  useEffect(() => {
    if (!window.sessionStorage.getItem('admin')) {
      navigate('/authorization');
    }
  }, [navigate]);

  const handleClickForOpenHallConfig = (event: React.MouseEvent<HTMLImageElement>) => {
    setArrowContent(!arrowContent);
    if (modalWindow === true) {
      setModalWindow(false);
    }
  };

  const handleAddNewHall = () => {
    setModalWindow(!modalWindow);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const {
        result: { halls },
      } = await api.post<ApiResponse, { hallName: string }>('/hall', {
        hallName: `зал ${inputRef.current?.value}`,
      });

      setHalls(halls);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitDeleteHall = async (id: number, hall_name: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Вы точно хотите удалить ${hall_name}`)) {
      try {
        const {
          result: { halls },
        } = await api.delete<ApiResponse>(id);
        setHalls(halls);
      } catch (error) {
        console.log('Удаление', error);
      }
    }
  };

  return (
    <section className="hall-params__managment">
      <HeaderForSectionInAdminPanel
        title="Управление залами"
        handleCLick={handleClickForOpenHallConfig}
        arrowContent={arrowContent}
      />

      {arrowContent ? (
        <div className="hall-params__configurate">
          <p>Доступные залы:</p>
          <ul className="hall-params__list">
            {halls?.map((hall, i) => {
              return (
                <li key={hall.id}>
                  {' '}
                  - {hall.hall_name}{' '}
                  <button
                    onClick={() => handleSubmitDeleteHall(hall.id, hall.hall_name)}
                    className="hall-params__btn-remove"
                    type="button"
                  ></button>
                </li>
              );
            })}
          </ul>
          <button className="btn" onClick={handleAddNewHall}>
            {' '}
            {modalWindow ? 'Закрыть' : 'Создать зал'}{' '}
          </button>
          {modalWindow ? (
            <form className="hall-params__create-hall" action="" onSubmit={handleSubmit}>
              <label htmlFor="hall">
                <span>Зал</span>{' '}
                <input
                  ref={inputRef}
                  name="hall"
                  type="number"
                  min={0}
                  placeholder="Укажите номер зала"
                  required
                />
                <button className="btn"> Отправить </button>
              </label>
            </form>
          ) : null}
        </div>
      ) : null}
    </section>
  );
};

export default ManagmentHall;
