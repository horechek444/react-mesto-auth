import React from "react";
import FormContent from "./FormContent";

const Register = ({isLoading}) => {
  const submitValue = `${isLoading ? `Регистрация...` : `Зарегистрироваться`}`;
  const formName = "register";
  const handleRegisterSubmit = (event, {inputValue}) => {
    event.preventDefault();
    console.log({
      email: inputValue.email,
      password: inputValue.password
    });
  }

  return (
    <section className="register">
      <h2 className="popup__title popup__title_type_white">Регистрация</h2>
        <FormContent handleSubmit={handleRegisterSubmit} formName={formName} submitValue={submitValue}/>
      <a href="#" className="register__link">Уже зарегистрированы? Войти</a>
    </section>
  )
}

export default Register;