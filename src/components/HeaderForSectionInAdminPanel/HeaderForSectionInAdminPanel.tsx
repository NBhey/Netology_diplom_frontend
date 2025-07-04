import image from './img/after.png';
import './HeaderForSectionInAdminPanel.css';
import { inputHeaderForSectionInAdminPanel } from '@/types/apiType'

const HeaderForSectionInAdminPanel: React.FC<inputHeaderForSectionInAdminPanel> = (props) => {
  const { title, arrowContent, handleCLick } = props;

  return (
    <header className="title">
      <h3>{title}</h3>
      <img
        className={arrowContent ? 'image' : 'img_rotate'}
        onClick={handleCLick}
        src={image}
        alt="стрелка"
      />
    </header>
  );
};

export default HeaderForSectionInAdminPanel;
