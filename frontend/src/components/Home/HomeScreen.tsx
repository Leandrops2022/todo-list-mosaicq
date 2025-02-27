import React, { useContext } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import styles from './HomeScreen.module.scss';
import logo from '../../assets/logo.jpeg';
import { TodoContext } from '../../context/TodoContext';

const HomeScreen: React.FC = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext is not available');
  }

  const { createAccount, setAccountCreation } = context;

  return (
    <main className={styles.main}>
      <div className={styles.presentation}>
        <h1 style={{ color: 'black' }}>GoTasks</h1>
        <div className={styles.logoDiv}>
          <img src={logo} alt="app logo" />
        </div>
      </div>

      <div className={styles.forms}>
        <div className={styles.welcome}>
          <LoginForm />
        </div>

        <div className={styles.newAccountToggleDiv}>
          <button
            className={styles.registerButton}
            onClick={() => {
              setAccountCreation();
            }}
          >
            {createAccount ? (
              <u>Já tem uma conta? clique aqui</u>
            ) : (
              <u>Não tem uma conta? Crie uma clicando aqui</u>
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default HomeScreen;
