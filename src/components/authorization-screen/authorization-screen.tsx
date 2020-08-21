import React from 'react';
import { Link } from 'react-router-dom';

import './authorization-screen.css';

export const AuthorizationScreen = () => {
    return (
      <section className="login">
        <div className="login_logo">
          <img src="./img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
        </div>
        <h2 className="login_title">Необходима авторизация</h2>
        <p className="login_text">Представтесь!</p>
        <form className="login_form" action="">
          <p className="login_field">
            <label className="login_label" htmlFor="name">Логин</label>
            <input className="login_input" type="text" name="name" id="name" />
          </p>
          <p className="login_field">
            <label className="login_label" htmlFor="password">Пароль</label>
            <input className="login_input" type="text" name="password" id="password" />
            <span className="login_error">Неверный пароль</span>
          </p>
          <a href="#"><button className="login_button button" type="submit">Зарегистрироваться</button></a>
        </form>
      </section>
    );
};