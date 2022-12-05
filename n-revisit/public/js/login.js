/* eslint-disable */
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    // Send a POST request
    const res = await fetch('http://127.0.0.1:8000/api/v1/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.status === 'fail') throw new Error(data.message);

    if (data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      // go to home page
      setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.message);
    console.log(`💥💥💥💥 ${err.message}`);
  }
};

export const logout = async () => {
  try {
    console.log('IN LOGOUT');
    // Send a POST request
    const res = await fetch('http://127.0.0.1:8000/api/v1/users/logout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data);
    if (data.status === 'fail' || data.status === 'Error')
      throw new Error(data.message);

    if (data.status === 'success') location.assign('/');
  } catch (err) {
    showAlert('error', `Error logging out! Try again.`);
  }
};
