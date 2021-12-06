import React from 'react';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <ToastContainer position="top-center" autoClose={1000} transition={Slide} />
  );
};

export default Toast;
