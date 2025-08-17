import HeaderForSectionInAdminPanel from '../HeaderForSectionInAdminPanel/HeaderForSectionInAdminPanel';
import { useState } from 'react';
import AddFilmModal from './AddFilmModal/AddFilmModal';


const GridSession: React.FC = () => {
  const [arrowContent, setArrowContent] = useState<boolean>(false);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const [addFilmModal, setAddFilmModal] = useState<boolean | null>(true)

  const handleClickForOpenGridSession = (event: React.MouseEvent<HTMLImageElement>) => {
    setArrowContent(!arrowContent);
    if (modalWindow === true) {
      setModalWindow(false);
    }
  };
 const handleClickForAddFilm = ():void => {
  addFilmModal === true ? setAddFilmModal(null) : setAddFilmModal(true)
 }
  return (
    <section>
      <HeaderForSectionInAdminPanel
        title="Сетка сеансов"
        handleCLick={handleClickForOpenGridSession}
        arrowContent={arrowContent}
      />
      {arrowContent ? <form className='hall-params__configurate '>
        <button className='btn' onClick={handleClickForAddFilm}>Добавить фильм</button>
      </form> : null}
      { addFilmModal ?? <AddFilmModal/>}
      
    </section>
  );
};

export default GridSession;
