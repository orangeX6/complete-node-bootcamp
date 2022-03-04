/*  eslint-disable */
import 'regenerator-runtime/runtime';
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';

//  DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logOutBtn = document.querySelector('.nav__el--logout');
const signupForm = document.querySelector('.signup');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

window.onload = function () {
  if (loginForm)
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      //  VALUES
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      login(email, password);
    });

  if (signupForm)
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('passwordConfirm').value;

      signup(username, email, password, passwordConfirm);
    });
};

// window.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('.signup').addEventListener('submit', (e) => {
//     e.preventDefault();

//     const username = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const passwordConfirm = document.getElementById('passwordConfirm').value;

//     signup(username, email, password, passwordConfirm);
//   });
// });

if (logOutBtn) logOutBtn.addEventListener('click', logout);
