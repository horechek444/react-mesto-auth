import React from "react";
import FormContent from "./FormContent";
import {Link, useHistory} from 'react-router-dom';
import * as auth from '../auth.js';

const Register = ({isLoading, onTooltipPopup}) => {
  const submitValue = `${isLoading ? `Регистрация...` : `Зарегистрироваться`}`;
  const formName = "register";
  const [message, setMessage] = React.useState('');
  const history = useHistory();

  const handleRegisterSubmit = (data) => {
    const {email, password} = data;
    if (!email || !password) {
      return;
    }

    auth.register(email, password)
      .then((res) => {
      if (res.statusCode !== 400) {
        setMessage('');
        onTooltipPopup();
        history.push('/signin');
      }
      else {
        onTooltipPopup();
        setMessage('Некорректно заполнено одно из полей');
      }
    });
  }

  return (
    <section className="register">
      <h2 className="popup__title popup__title_type_white">Регистрация</h2>
      <span className="login__error">{message}</span>
      <FormContent handleSubmit={handleRegisterSubmit} formName={formName} submitValue={submitValue}/>
      <Link to="sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
    </section>
  );
}

export default Register;