import { Hall } from '@/types/apiType';
import { JSX, useEffect, useState, useCallback } from 'react';
import HeaderForSectionInAdminPanel from '../HeaderForSectionInAdminPanel/HeaderForSectionInAdminPanel';
import './ConfigurateHall.css';
import standart from './img/standart_places.png';
import vip from './img/vip_places.png';
import disabled from './img/block_places.png';
import { useHalls } from '../../contexts/HallsContext';

const ConfigurateHall: React.FC = () => {
  const [arrowContent, setArrowContent] = useState<boolean>(false);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  // eslint-disable-next-line
  const { halls, setHalls } = useHalls();
  const [currentHall, setCurrentHall] = useState<Hall | null>(null);
  const [activeHall, setActiveHall] = useState<number>(0);
  // eslint-disable-next-line
  const [currentRow, setCurrentRow] = useState<number>(0);

  useEffect(() => {
    if (halls.length > 0) {
      setCurrentHall(halls[0]);
    }
  }, [halls]);

  useEffect(() => {
    if (currentHall) {
      setCurrentRow(currentHall.hall_rows);
    }
  }, [currentHall]);

  const handleClickForOpenHallConfig = (event: React.MouseEvent<HTMLImageElement>) => {
    setArrowContent(!arrowContent);
    if (modalWindow) {
      setModalWindow(false);
    }
  };

  const handleClickForChangeHall = useCallback((index: number) => {
    setCurrentHall(halls[index]);
    setActiveHall(index);
  }, [halls]);

  const handleChangeRow = useCallback((allRowNumber: number) => {
    if (allRowNumber < 0) return;
    
    setCurrentRow(allRowNumber);
    setCurrentHall(prevState => {
      if (!prevState) return null;
      return {
        ...prevState,
        hall_rows: allRowNumber,
      };
    });
  }, []);

  const handleChangePlaces = useCallback((allPlacesNumber: number) => {
    if (allPlacesNumber < 0) return;
    setCurrentHall(prevState => {
      if (!prevState) return null;
      return {
        ...prevState,
        hall_places: allPlacesNumber,
      };
    });
  }, []);

  const handleChangeStatusPlaces = useCallback((row: number, places: number) => {
    setCurrentHall(prevState => {
      if (!prevState) return null;
      return {
        ...prevState,
        hall_config: prevState.hall_config.map((r, rIndex) => {
          if (rIndex === row) {
            return r.map((p, pIndex) => {
              if (pIndex === places && p === 'standart') return 'vip';
              if (pIndex === places && p === 'vip') return 'disabled';
              if (pIndex === places && p === 'disabled') return 'standart';
              return p;
            });
          }
          return r;
        }),
      };
    });
  }, []);

  const renderHallScheme = useCallback(() => {
    if (!currentHall) return [];
    
    const rows: JSX.Element[] = [];
    for (let rowIndex = 0; rowIndex < currentHall.hall_rows; rowIndex++) {
      const cells: JSX.Element[] = [];

      for (let placesIndex = 0; placesIndex < currentHall.hall_places; placesIndex++) {
        const place = currentHall.hall_config[rowIndex]?.[placesIndex] || 'standart';
        const key = `${rowIndex}-${place}-${placesIndex}`;

        let imgSrc: string;
        let imgAlt: string;

        switch (place) {
          case 'standart':
            imgSrc = standart;
            imgAlt = 'standart';
            break;
          case 'vip':
            imgSrc = vip;
            imgAlt = 'vip';
            break;
          default:
            imgSrc = disabled;
            imgAlt = 'disabled';
        }

        cells.push(
          <td key={key}>
            <img
              onClick={() => handleChangeStatusPlaces(rowIndex, placesIndex)}
              src={imgSrc}
              alt={imgAlt}
            />
          </td>
        );
      }

      rows.push(<tr key={rowIndex}>{cells}</tr>);
    }

    return rows;
  }, [currentHall, handleChangeStatusPlaces]);

  return (
    <section>
      <HeaderForSectionInAdminPanel
        title="Конфигурация залов"
        handleCLick={handleClickForOpenHallConfig}
        arrowContent={arrowContent}
      />
      {arrowContent && (
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
          <div className="hall-place">
            <p>Укажите количество рядов и максимальное количество кресел в ряду</p>
            <div className="hall-price__configurate">
              <label>
                <span>Рядов, шт</span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={currentHall?.hall_rows || 0}
                  onChange={(e) => handleChangeRow(Number(e.target.value))}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </label>
              <span>x</span>
              <label>
                <span>Мест, шт</span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={currentHall?.hall_places || 0}
                  onChange={(e) => handleChangePlaces(Number(e.target.value))}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </label>
            </div>
          </div>
          <div className="hall-sheme-description">
            <p>Теперь вы можете указать типы кресел на схеме зала:</p>
            <div className="hall-sheme__description-place">
              <span><img src={standart} alt="standart" /> - обычные кресла</span>
              <span><img src={vip} alt="vip" /> - VIP кресла</span>
              <span><img src={disabled} alt="disabled" /> - заблокированные (нет кресла)</span>
            </div>
            <p>Чтобы изменить вид кресла кликните по нему левой кнопкой мыши</p>
          </div>
          <table className="hall-sheme">
            <caption>Экран</caption>
            <tbody>
              {renderHallScheme()}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ConfigurateHall;