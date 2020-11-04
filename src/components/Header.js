import React from "react";
import logo from '../images/logo.svg';

const Header = () => {
    return (
        <header className="header page__header">
            <a className="logo header__logo opacity" href="../../public/index.html">
                <img className="logo__image" src={logo} alt="Логотип сайта Место" />
            </a>
        </header>
    );
}

export default Header;