import React from "react";
import logo from '../images/logo.svg';
import {Link} from 'react-router-dom';

const Header = ({loggedIn, isRegister, userData}) => {
  const handleLinkName = (loggedIn, isRegister) => {
    if (!loggedIn && !isRegister) {
      return "Регистрация";
    } else if (!loggedIn && isRegister) {
      return "Войти";
    } else if (loggedIn) {
      return "Выйти";
    }
  }

  const handleLink = (loggedIn, isRegister) => {
    if (!loggedIn) {
      return "sing-in";
    } else if (isRegister) {
      return "sing-up";
    } else {
      return "";
    }
  }

  return (
    <header className="header page__header">
      <a className="logo header__logo opacity" href="../../public/index.html">
        <img className="logo__image" src={logo} alt="Логотип сайта Место"/>
      </a>
      <div className="header__cover">
        <span className="header__email">{userData.email}</span>
        <Link to={handleLink}
              className={`${loggedIn ? `header__link header__link_type_log-out` : `header__link`}`}>{handleLinkName}</Link>
      </div>
    </header>
  );
}

export default Header;