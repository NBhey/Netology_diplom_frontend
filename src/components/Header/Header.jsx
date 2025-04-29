import React from "react";
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-wrapper">
        <h1 className="header__title">
          идём<span className="header__title_weight">в</span>кино
        </h1>
        <button className="header__btn">войти</button>
      </div>
    </header>
  );
};

export default Header