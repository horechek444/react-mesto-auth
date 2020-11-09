import React from "react";
import FormContent from "./FormContent";
import * as auth from '../auth.js';
import { useHistory } from 'react-router-dom';
import {setToken} from "../utils/token";

const Login = ({handleLogin, isLoading}) => {
  const submitValue = `${isLoading ? `Выполняется вход...` : `Войти`}`;
  const formName = "login";
  const [message, setMessage] = React.useState('');
  const history = useHistory();

  const handleLoginSubmit = (data) => {
    const {email, password} = data;
    console.log(data);
    if (!email|| !password){
      return;
    }

    auth.authorize(email, password)
      .then((data) => {
        console.log(data);
        if (!data){
          setMessage('Что-то пошло не так!')
        }

        if (data.jwt) {
          setToken(data.jwt);
          setMessage('');
          handleLogin(data.user);
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <section className="login register">
      <h2 className="popup__title popup__title_type_white">Вход</h2>
      <span className="login__error">{message}</span>
        <FormContent handleSubmit={handleLoginSubmit} formName={formName} submitValue={submitValue}/>
    </section>
  )
}

export default Login;