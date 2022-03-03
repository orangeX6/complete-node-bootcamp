/* eslint-disable */

const signup = (username, email, password, passwordConfirm) => {
  console.log(username, email, password, passwordConfirm);
};

window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.signup').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    signup(username, email, password, passwordConfirm);
  });
});
