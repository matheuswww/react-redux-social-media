import React from 'react';
import { Routes,Route, Navigate } from 'react-router-dom';
import LoginCreate from './LoginCreate';
import LoginForm from './LoginForm';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';
import styles from './Login.module.css';
import NotFound from '../NotFound';
import { useSelector } from 'react-redux';
import Load from '../Helper/Load';

const Login = () => {
  const { data,loading } = useSelector(state => state.user);

  if(loading) return <Load />
  if(data) return <Navigate to="/conta"/>
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />}/>
          <Route path="criar" element={<LoginCreate />}/>
          <Route path="perdeu" element={<LoginPasswordLost />}/>
          <Route path="resetar" element={<LoginPasswordReset />}/>

          <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>
    </section>
  );
};

export default Login;