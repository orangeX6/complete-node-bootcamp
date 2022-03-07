/*  eslint-disable */
import 'regenerator-runtime/runtime';
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';

//  DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const signupForm = document.querySelector('.form--sign-up');
const updateUserForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-password');

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

if (updateUserForm)
  updateUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    updateSettings({ name, email }, 'data');
  });

if (updatePasswordForm)
  updatePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.btn--save-password').textContent = 'Save Password';
  });
