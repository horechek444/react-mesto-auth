import React from "react";
import FormContent from "./FormContent";
import * as auth from '../auth.js';
import { useHistory } from 'react-router-dom';
import { setToken } from "../utils/token";

const Login = ({onLogin, isLoading}) => {
  const submitValue = `${isLoading ? `Выполняется вход...` : `Войти`}`;
  const formName = "login";
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLoginSubmit = ({email, password}) => {
    if (!email || !password){
      return;
    }
    onLogin(email, password);
  }

  return (
    <section className="login register">
      <h2 className="popup__title popup__title_type_white">Вход</h2>
        <FormContent handleSubmit={handleLoginSubmit} formName={formName} submitValue={submitValue}/>
    </section>
  )
}

export default Login;