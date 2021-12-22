import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicRoute from '@components/Routes/PublicRoute';
import PrivateRoute from '@components/Routes/PrivateRoute';

import Home from '@pages/Home/Home';
import Login from '@pages/User/Login/Login';
import Register from '@pages/User/Register/Register';
import Dashboard from '@pages/Dashboard/Dashboard';
import ChannelCreate from '@pages/Dashboard/ChannelCreate';
import ChannelUpdate from '@pages/Dashboard/ChannelUpdate';
import Setting from '@pages/User/Setting/Setting';

import Toast from '@components/Toast/Toast';

const App = () => {
  const appHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    window.addEventListener('resize', appHeight);
    appHeight();
    return () => {
      window.removeEventListener('resize', appHeight);
    };
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<PublicRoute restricted />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/register" element={<PublicRoute restricted />}>
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/dashboard" element={<PrivateRoute adminOnly />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/channel-create" element={<PrivateRoute adminOnly />}>
            <Route path="/channel-create" element={<ChannelCreate />} />
          </Route>
          <Route path="/channel-update" element={<PrivateRoute adminOnly />}>
            <Route path=":_channelId" element={<ChannelUpdate />} />
          </Route>
          <Route path="/setting" element={<PrivateRoute />}>
            <Route path="/setting" element={<Setting />} />
          </Route>
        </Routes>
      </Router>
      <Toast />
    </>
  );
};

export default App;
