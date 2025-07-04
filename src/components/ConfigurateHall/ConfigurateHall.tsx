import { api } from '../../api/api';
import { ApiResponse, Hall } from '@/types/apiType';
import { useEffect, useState } from 'react';
import HeaderForSectionInAdminPanel from '../HeaderForSectionInAdminPanel/HeaderForSectionInAdminPanel';
import './ConfigurateHall.css';
import standrt from './img/standart_places.png'
import vip from './img/vip_places.png'
import block from './img/block_places.png'

const ConfigurateHall: React.FC = () => {
  const [arrowContent, setArrowContent] = useState<boolean>(false);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const [halls, setData] = useState<Array<Hall>>([]);
  const [currentHall, setCurrentHall] = useState<Hall | null>(null);

  useEffect(() => {
    async function getData() {
      const {
        result: { halls },
      } = await api.get<ApiResponse>('/alldata');
      console.log('я halls', halls);
      setData(halls);
      setCurrentHall(halls[0]);
      // console.log(currentHall)
    }

    getData();
  }, []);

  const handleClickForOpenHallConfig = (event: React.MouseEvent<HTMLImageElement>) => {
    setArrowContent(!arrowContent);
    if (modalWindow === true) {
      setModalWindow(false);
    }
  };

  const handleClickForChangeHall = (index: number) => {
    setCurrentHall(halls[index]);
    console.log(halls[index]);
  };
  console.log(currentHall);
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
          <div className="hall-sheme">
            <p>Теперь вы можете указать типы кресел на схеме зада: </p>
            <span><img src={standrt} alt="standart" /> - обычные кресла</span>
            <span><img src={vip} alt="standart" /> - VIP кресла</span>
            <span><img src={block} /> - заблокированные (нет кресла)</span>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ConfigurateHall;
