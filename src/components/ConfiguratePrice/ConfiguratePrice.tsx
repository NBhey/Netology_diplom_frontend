import { useState, useEffect } from 'react';
import { useHalls } from '../../contexts/HallsContext';
import { Hall } from '@/types/apiType';
import HeaderForSectionInAdminPanel from '../HeaderForSectionInAdminPanel/HeaderForSectionInAdminPanel';
import standart from './img/standart_places.png';
import vip from './img/vip_places.png';
import './ConfiguratePrice.css';
import { api } from '../../api/api';
const ConfiguratePrice: React.FC = () => {
  const [arrowContent, setArrowContent] = useState<boolean>(false);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  // eslint-disable-next-line
  const { halls, setHalls } = useHalls();
  const [currentHall, setCurrentHall] = useState<Hall | null>(null);
  const [activeHall, setActiveHall] = useState<number>(0);

  useEffect(() => {
    if (halls.length > 0) {
      setCurrentHall(halls[0]);
    }
  }, [halls]);

  const handleClickForOpenHallConfig = (event: React.MouseEvent<HTMLImageElement>) => {
    setArrowContent(!arrowContent);
    if (modalWindow === true) {
      setModalWindow(false);
    }
  };

  const handleClickForChangeHall = (index: number) => {
    setActiveHall(index);
    setCurrentHall(halls[index]);
    console.log(halls[index]);
  };

  const handleChangePriceForStandartPlace = (currentPrice: number): void => {
    setCurrentHall((prevState) => {
      if (!prevState) return null;
      return { ...prevState, hall_price_standart: currentPrice };
    });
  };

  const handleChangePriceForVipPlace = (currentPrice: number): void => {
    setCurrentHall((prevState) => {
      if (!prevState) return null;
      return { ...prevState, hall_price_vip: currentPrice };
    });
  };

  const handleClickForCancelChangePrice = (): void => {
    setCurrentHall(halls[activeHall]);
  };

  const handleSubmitPrice = async () => {
    await api.post(`/price/${currentHall?.id}`, {
      'priceStandart':currentHall?.hall_price_standart,
      'priceVip': currentHall?.hall_price_vip
    })
  };

  return (
    <section>
      <HeaderForSectionInAdminPanel
        title="Кофигурация цен"
        handleCLick={handleClickForOpenHallConfig}
        arrowContent={arrowContent}
      />
      {arrowContent ? (
        <div className="hall-params__configurate">
          <p>Выберите зал для конфигурации</p>
          <ul className="hall-list">
            {halls.map((hall, index) => (
              <li key={hall.id}>
                <button
                  className={`hall-list__btn ${activeHall === index ? 'hall-list__btn-active' : ''}`}
                  onClick={() => handleClickForChangeHall(index)}
                >
                  {hall.hall_name}
                </button>
              </li>
            ))}
          </ul>
          <p>Установите цены для типов кресел:</p>
          <form className="configurate-price__form" onSubmit={handleSubmitPrice}>
            <div>
              <span>Цена рублей</span>
              <label htmlFor="standart-places">
                <input
                  id="standart-places"
                  type="number"
                  min={0}
                  value={currentHall?.hall_price_standart || 0}
                  onChange={(e) => {
                    handleChangePriceForStandartPlace(+e.target.value);
                  }}
                />
                <span>за</span>
                <img src={standart} alt="standart_places" />
                <span>обычные кресла</span>
              </label>
            </div>
            <div>
              <span>Цена рублей</span>
              <label htmlFor="vip-places">
                <input
                  id="vip-places"
                  type="number"
                  min={0}
                  value={currentHall?.hall_price_vip || 0}
                  onChange={(e) => {
                    handleChangePriceForVipPlace(+e.target.value);
                  }}
                />
                <span>за</span>
                <img src={vip} alt="vip_places" />
                <span>VIP кресла</span>
              </label>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button className="btn btn_cancel" onClick={handleClickForCancelChangePrice}>
                Отмена
              </button>
              <button className="btn"> Сохарнить </button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
};

export default ConfiguratePrice;
