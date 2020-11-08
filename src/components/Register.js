import React from "react";
import FormContent from "./FormContent";
import {Link, useHistory} from 'react-router-dom';
import * as auth from '../auth.js';

const Register = ({onRegister, isLoading}) => {
  const submitValue = `${isLoading ? `Регистрация...` : `Зарегистрироваться`}`;
  const formName = "register";

  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const {email, password} = data;

    if (!email || !password) {
      return;
    }

    auth.register(email, password).then((res) => {
      // if (res.statusCode !== 400) {
      //   setMessage('');
      //   history.push('/login');
      // } else {
      //   setMessage('Что-то пошло не так!')
      // }
    });
  }

  return (
    <section className="register">
      <h2 className="popup__title popup__title_type_white">Регистрация</h2>
      <FormContent handleSubmit={handleRegisterSubmit} formName={formName} submitValue={submitValue}/>
      <Link to="sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
    </section>
  );
}

export default Register;