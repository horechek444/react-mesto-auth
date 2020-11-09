import React from "react";
import logo from '../images/logo.svg';
import {Link} from 'react-router-dom';

const Header = ({loggedIn, userData}) => {
  const handleLinkName = (loggedIn, userData) => {
    if (!loggedIn && !userData) {
      return "Регистрация";
    } else if (loggedIn && userData) {
      return "Выйти";
    } else if (!loggedIn) {
      return "Войти";
    }
  }

  return (
    <header className="header page__header">
      <a className="logo header__logo opacity" href="../../public/index.html">
        <img className="logo__image" src={logo} alt="Логотип сайта Место"/>
      </a>
      <div className="header__cover">
        <span className={`${loggedIn ? `header__email header__email_type_active` : `header__email`}`}>{userData.email}</span>
        <Link to={`${loggedIn ? `sign-in` : `sign-up`}`}
              className={`${loggedIn ? `header__link header__link_type_log-out` : `header__link`}`}>{handleLinkName()}</Link>
      </div>
    </header>
  );
}

export default Header;