import React from "react";
import logo from '../images/logo.svg';
import {removeToken} from "../utils/token";
import {Link, useLocation } from 'react-router-dom';
import * as auth from "../auth";
// import {getContent} from "../auth";
// import * as auth from '../auth.js';

const Header = ({onSignOut, loggedIn, userData}) => {
  const location = useLocation();

  const handleLinkName = () => {
    if (location.pathname === '/signin') {
      return 'Регистрация';
    } else if (location.pathname === '/') {
      return 'Выйти';
    } else {
      return 'Войти';
    }
  }

  const handleLink = () => {
    if (handleLinkName() === 'Регистрация') {
      return '/signup';
    } else if (handleLinkName() === 'Войти') {
      return '/signin';
    } else {
      removeToken();
      return '/signin';
    }
  }

  return (
    <header className="header page__header">
      <a className="logo header__logo opacity" href="../../public/index.html">
        <img className="logo__image" src={logo} alt="Логотип сайта Место"/>
      </a>
      <div className="header__cover">
        <span className={`${loggedIn ? `header__email header__email_type_active` : `header__email`}`}>{}</span>
        <Link to={handleLink()}
              className={`${loggedIn ? `header__link header__link_type_log-out opacity` : `header__link opacity`}`}>{handleLinkName()}</Link>
      </div>
    </header>
  );
}

export default Header;