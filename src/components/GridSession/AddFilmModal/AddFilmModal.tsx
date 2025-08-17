import styles from './styles.module.css'


const AddFilmModal: React.FC = () => {
    return <div>
        <header></header>
        <div className={styles.popup__settings}>
              <label className={`${styles.admin__label} ${styles.popup__input}`} htmlFor="film-name">Название фильма</label>
              <input className="admin__input popup__input" type="text" name="filmName" id="film-name" placeholder="Например, «Гражданин Кейн»" required />
              <label className="admin__label popup__label" htmlFor="film-duration">Продолжительность фильма (мин.)</label>
              <input className="admin__input popup__input" type="number" name="filmDuration" id="film-duration" value={''} onChange={()=>{}} required />
              <label className="admin__label popup__label" htmlFor="film-description">Описание фильма</label>
              <textarea className="popup__textarea" name="filmDescription" id="film-description" required />
              <label className="admin__label popup__label" htmlFor="film-origin">Страна</label>
              <input className="admin__input popup__input" type="text" name="filmOrigin" id="film-origin" required />
        </div>
        
    </div>
}

export default AddFilmModal