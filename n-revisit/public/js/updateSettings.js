/* eslint-disable */
import { showAlert } from './alerts';

export const updateUserData = async (userData, type) => {
  try {
    const url = type === 'password' ? 'updatePassword' : 'updateMe';
    const options = { method: 'PATCH' };

    if (type === 'password') {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify({ ...userData });
    } else {
      options.body = userData;
    }

    const res = await fetch(
      `http://127.0.0.1:8000/api/v1/users/${url}`,
      options
    );

    // console.log(options, userData);

    const data = await res.json();
    if (data.status === 'fail' || data.status === 'Error')
      throw new Error(data.message);

    if (data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
      // go to home page
      // setTimeout(() => {
      // location.assign('/me');
      // }, 4500);
    }
  } catch (err) {
    showAlert('error', err.message);
    console.log(`💥 ${err.message}`);
  }
};
