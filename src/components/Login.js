import React from "react";
import FormContent from "./FormContent";

const Login = ({isLoading}) => {
  const submitValue = `${isLoading ? `Выполняется вход...` : `Войти`}`;
  const formName = "login";
  const handleLoginSubmit = (event, {inputValue}) => {
    event.preventDefault();
    console.log({
      email: inputValue.email,
      password: inputValue.password
    });
  }

  return (
    <section className="login register">
      <h2 className="popup__title popup__title_type_white">Вход</h2>
        <FormContent handleSubmit={handleLoginSubmit} formName={formName} submitValue={submitValue}/>
    </section>
  )
}

export default Login;