import React from "react";
import logo from '../images/logo.svg';
import {useHistory, useLocation} from 'react-router-dom';

const Header = ({onSignOut, loggedIn, email}) => {
  const location = useLocation();
  const history = useHistory();

  const handleLinkName = () => {
    if (location.pathname === '/signin') {
      return 'Регистрация';
    } else if (location.pathname === '/') {
      return 'Выйти';
    } else {
      return 'Войти';
    }
  }

  const handleButtonClick = () => {
    if (handleLinkName() === 'Регистрация') {
      history.push('/signup');
    } else if (handleLinkName() === 'Войти') {
      history.push('/signin');
    } else {
      onSignOut();
    }
  }

  return (
    <header className="header page__header">
      <a className="logo header__logo opacity" href="../../public/index.html">
        <img className="logo__image" src={logo} alt="Логотип сайта Место"/>
      </a>
      <div className="header__cover">
        <span
          className={`${loggedIn ? `header__email header__email_type_active` : `header__email`}`}>{email}</span>
        <button
          className={`${loggedIn ? `header__button header__button_type_log-out opacity` : `header__button opacity`}`}
          onClick={handleButtonClick}>{handleLinkName()}</button>
      </div>
    </header>
  );
}

export default Header;