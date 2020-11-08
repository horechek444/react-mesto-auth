import React from "react";
import FormContent from "./FormContent";
import * as auth from '../auth.js';
import { useHistory } from 'react-router-dom';

const Login = ({isLoading}) => {
  const submitValue = `${isLoading ? `Выполняется вход...` : `Войти`}`;
  const formName = "login";
  const [message, setMessage] = React.useState('');
  const history = useHistory();

  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const {email, password} = data;

    if (!email|| !password){
      return;
    }

    auth.authorize(email, password)
      .then((data) => {
        if (!data){
          setMessage('Что-то пошло не так!')
        }

        if (data.jwt) {
          // setToken(data.jwt);
          // setData({ email: '', password: ''});
          // setMessage('');
          // handleLogin(data.user);
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <section className="login register">
      <h2 className="popup__title popup__title_type_white">Вход</h2>
        <FormContent handleSubmit={handleLoginSubmit} formName={formName} submitValue={submitValue}/>
    </section>
  )
}

export default Login;