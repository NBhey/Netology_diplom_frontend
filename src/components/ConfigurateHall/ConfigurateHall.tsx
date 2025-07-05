import { api } from '../../api/api';
import { Hall } from '@/types/apiType';
import { useEffect, useState } from 'react';
import HeaderForSectionInAdminPanel from '../HeaderForSectionInAdminPanel/HeaderForSectionInAdminPanel';
import './ConfigurateHall.css';
import standart from './img/standart_places.png';
import vip from './img/vip_places.png';
import block from './img/block_places.png';
import { useHalls } from '../../contexts/HallsContext';

const ConfigurateHall: React.FC = () => {
  const [arrowContent, setArrowContent] = useState<boolean>(false);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const { halls, setHalls } = useHalls();
  const [currentHall, setCurrentHall] = useState<Hall | null>(null);

  useEffect(() => {
    setCurrentHall(halls[0]);
  }, [halls]);

  const handleClickForOpenHallConfig = (event: React.MouseEvent<HTMLImageElement>) => {
    setArrowContent(!arrowContent);
    if (modalWindow === true) {
      setModalWindow(false);
    }
  };

  const handleClickForChangeHall = (index: number) => {
    setCurrentHall(halls[index]);
  };

  return (
    <section>
      <HeaderForSectionInAdminPanel
        title="Конфигурация залов"
        handleCLick={handleClickForOpenHallConfig}
        arrowContent={arrowContent}
      />
      {arrowContent ? (
        <div className="hall-params__configurate">
          <p>Выберите зал для конфигурации</p>
          <ul className="hall-list">
            {halls?.map((hall, index) => {
              return (
                <li key={hall.id}>
                  <button onClick={() => handleClickForChangeHall(index)}>{hall.hall_name}</button>
                </li>
              );
            })}
          </ul>
          <div className="hall-place">
            <p>Укажите количество рядов и максимальное количество кресел в ряду</p>
            <div className="hall-price__configurate">
              <label>
                <span>Рядов, шт</span>
                <input type="number" min={0} placeholder={`${currentHall?.hall_rows}`} />
              </label>
              <span>x</span>
              <label>
                <span>Мест, шт </span>
                <input type="number" min={0} placeholder={`${currentHall?.hall_places}`} />
              </label>
            </div>
          </div>
          <div className="hall-sheme-description">
            <p>Теперь вы можете указать типы кресел на схеме зада: </p>
            <div className="hall-sheme__description-place">
              <span>
                <img src={standart} alt="standart" /> - обычные кресла
              </span>
              <span>
                <img src={vip} alt="vip" /> - VIP кресла
              </span>
              <span>
                <img src={block} alt="block" /> - заблокированные (нет кресла)
              </span>
            </div>
          </div>
          <table className="hall-sheme">
            <caption>Экран</caption>
            <tbody>
              {currentHall?.hall_config.map((row, index) => {
                return (
                  <tr key={index}>
                    {currentHall?.hall_config[index].map((place: string, i) => {
                      return place === 'standart' ? (
                        <td key={`${index}-${place}-${i}`}>
                          <img src={standart} alt="standart" />
                        </td>
                      ) : place === 'vip' ? (
                        <td key={`${index}-${place}-${i}`}>
                          <img src={vip} alt="vip" />
                        </td>
                      ) : (
                        <td key={`${index}-${place}-${i}`}>
                          <img src={block} alt="block" />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
};

export default ConfigurateHall;
