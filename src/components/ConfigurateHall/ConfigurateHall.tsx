import { Hall } from '@/types/apiType';
import { useEffect, useState } from 'react';
import HeaderForSectionInAdminPanel from '../HeaderForSectionInAdminPanel/HeaderForSectionInAdminPanel';
import './ConfigurateHall.css';
import standart from './img/standart_places.png';
import vip from './img/vip_places.png';
import disabled from './img/block_places.png';
import { useHalls } from '../../contexts/HallsContext';

const ConfigurateHall: React.FC = () => {
  const [arrowContent, setArrowContent] = useState<boolean>(false);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const handleChangeRow = (allRowNumber: number) => {
    if (allRowNumber < 0) return;
    setCurrentHall((prevState) => {
      if (!prevState) return null;
      return {
        ...prevState,
        hall_rows: allRowNumber !== undefined ? allRowNumber : prevState.hall_rows,
      };
    });
  };

  const handleChangePlaces = (allPlacesNumber: number) => {
    if (allPlacesNumber < 0) return;
    setCurrentHall((prevState) => {
      if (!prevState) return null;
      return {
        ...prevState,
        hall_places: allPlacesNumber !== undefined ? allPlacesNumber : prevState.hall_places,
      };
    });
  };

  const handleChangeStatusPlaces = (row: number, places: number) => {
    console.log(row, places);
   
    setCurrentHall((prevState) => {
      if (!prevState) return null;
      return {
        ...prevState,
        hall_config: prevState.hall_config.map((r, rIndex) => {
          if (rIndex === row) {
           return r.map((p, pIndex) => {
              if (pIndex === places && p === 'standart') return 'vip';
              if (pIndex === places && p === 'vip') return 'disabled';
              if (pIndex === places && p === 'disabled') return 'standart';
              return p
            });
          }
          return r
        }),
      };
    });
        console.log(currentHall);
         console.log(currentHall?.hall_config[row][places]);

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
                <input
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(e) => {
                    handleChangeRow(+e.target.value);
                  }}
                  type="number"
                  min={1}
                  max={10}
                  value={currentHall?.hall_rows}
                />
              </label>
              <span>x</span>
              <label>
                <span>Мест, шт </span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={currentHall?.hall_places}
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(e) => {
                    handleChangePlaces(+e.target.value);
                  }}
                />
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
                <img src={disabled} alt="disabled" /> - заблокированные (нет кресла)
              </span>
            </div>
          </div>
          <table className="hall-sheme">
            <caption>Экран</caption>
            <tbody>
              {currentHall?.hall_config.map((row, rowIndex) => {
                if (rowIndex >= currentHall?.hall_rows) return;
                return (
                  <tr key={rowIndex}>
                    {currentHall?.hall_config[rowIndex].map((place: string, placesIndex) => {
                      if (placesIndex >= currentHall?.hall_places) return;
                      return place === 'standart' ? (
                        <td key={`${rowIndex}-${place}-${placesIndex}`}>
                          <img
                            onClick={() => {
                              handleChangeStatusPlaces(rowIndex, placesIndex);
                            }}
                            src={standart}
                            alt="standart"
                          />
                        </td>
                      ) : place === 'vip' ? (
                        <td key={`${rowIndex}-${place}-${placesIndex}`}>
                          <img
                            onClick={() => {
                              handleChangeStatusPlaces(rowIndex, placesIndex);
                            }}
                            src={vip}
                            alt="vip"
                          />
                        </td>
                      ) : (
                        <td key={`${rowIndex}-${place}-${placesIndex}`}>
                          <img
                            onClick={() => {
                              handleChangeStatusPlaces(rowIndex, placesIndex);
                            }}
                            src={disabled}
                            alt="disabled"
                          />
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
