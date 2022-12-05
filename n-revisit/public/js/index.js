/* eslint-disable */
import 'regenerator-runtime/runtime.js';
import 'core-js/stable';
import { login, logout } from './login.js';
import { signup } from './signup.js';
import { updateUserData } from './updateSettings.js';
import displayMap from './mapbox.js';
import { resizeImage } from './resizeImage.js';
import { bookTour } from './stripe';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--sign-up');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateUserForm = document.querySelector('.form-user-data');
const updatePasswordForm = document.querySelector('.form-user-password');
const pfpUploadInput = document.getElementById('photo');
const bookBtn = document.getElementById('book-tour');

window.addEventListener('load', () => {
  // DELEGATION
  if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      await login(email, password);
    });
  }

  if (logOutBtn) logOutBtn.addEventListener('click', logout);

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('passwordConfirm').value;

      await signup(username, email, password, passwordConfirm);
    });
  }

  if (updateUserForm) {
    const userPhotoElement = document.querySelector('.form__user-photo');
    console.dir(userPhotoElement);
    console.log(userPhotoElement);

    pfpUploadInput.addEventListener('change', async (e) => {
      // console.dir(pfpUploadInput);
      const inputPic = pfpUploadInput.files[0];
      if (inputPic) {
        const userPhotoElement = document.querySelector('.form__user-photo');
        resizeImage(inputPic, 500, 500, userPhotoElement);
      }
    });

    updateUserForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      document.querySelector('.btn--save-settings').textContent = 'UPDATING...';

      const form = new FormData();
      form.append('name', document.getElementById('name').value);
      form.append('email', document.getElementById('email').value);
      form.append('photo', document.getElementById('photo').files[0]);

      await updateUserData(form, 'data');

      // await updateUserData(form, 'data');
      document.querySelector('.btn--save-settings').textContent =
        'SAVE SETTINGS';
    });
  }

  if (updatePasswordForm)
    updatePasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      document.querySelector('.btn--save-password').textContent = 'Updating...';

      const currentPassword = document.getElementById('password-current').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;

      await updateUserData(
        { currentPassword, password, passwordConfirm },
        'password'
      );

      document.getElementById('password-current').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password-confirm').value = '';
      document.querySelector('.btn--save-password').textContent =
        'Save Password';
    });

  if (bookBtn)
    bookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.textContent = 'Processing...';
      const { tourId } = e.target.dataset;
      bookTour(tourId);
    });
});
