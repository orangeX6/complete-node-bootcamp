/* eslint-disable */

const signup = (email, password) => {
  alert(email, password);
};

window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.signup').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('email').value;
    login(email, password);
  });
});
