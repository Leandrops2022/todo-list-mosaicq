import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import styles from './LoginForm.module.scss';
import { TodoContext } from '../../context/TodoContext';
import axios from 'axios';
import AuthParams from '../../interfaces/AuthParams';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const context = useContext(TodoContext);

  const navigate = useNavigate();

  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!context) {
    throw new Error('TodoContext is not available');
  }

  const { createAccount, updateToken, updateUserName, updateUid } = context;

  const initialValues: AuthParams = { email: '', password: '', name: '', confirmPassword: '' };

  const validationSchema = createAccount
    ? Yup.object({
        email: Yup.string().email('Email inválido').required('O email não pode estar em branco'),
        password: Yup.string()
          .min(4, 'A senha deve ter pelo menos 4 caracteres')
          .max(12, 'A senha deve ter no máximo 12 caracteres')
          .required('Você deve preencher o campo senha'),
        name: Yup.string()
          .min(4, 'O nome deve ter pelo menos 4 caracteres')
          .max(150, 'O nome deve ter no máximo 12 caracteres')
          .required('Você deve preencher o campo nome'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
          .required('A confirmação de senha é necessária'),
      })
    : Yup.object({
        email: Yup.string().email('Email inválido').required('O email não pode estar em branco'),
        password: Yup.string()
          .min(4, 'A senha deve ter pelo menos 4 caracteres')
          .max(12, 'A senha deve ter no máximo 12 caracteres')
          .required('Você deve preencher o campo senha'),
      });

  const handleAuthRequest = async (payload: AuthParams) => {
    // eslint-disable-next-line prefer-const
    let sufix = createAccount ? 'criar-usuario' : 'login';
    const url = `http://127.0.0.1:3000/api/auth/${sufix}`;
    setErrorMessage('');
    setMessage('');
    try {
      const response = await axios.post(url, payload);

      if (response.status == 200 || response.status == 201) {
        const results = response.data;
        setMessage(results.message);
        updateToken(results.token);
        updateUserName(results.data.name);
        updateUid(results.data.id);
        navigate('/dashboard');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Erro ao tentar acessar com os dados fornecidos');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        handleAuthRequest(values);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          {createAccount && (
            <div className={styles.wrapper}>
              <div className={styles.labelAndFieldContainer}>
                <label htmlFor="name">Nome</label>
                <Field type="text" name="name" className={styles.input} />
              </div>
              <ErrorMessage name="name" component={'div'} className={styles.error} />
            </div>
          )}

          <div className={styles.wrapper}>
            <div className={styles.labelAndFieldContainer}>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className={styles.input} />
            </div>
            <ErrorMessage name="email" component={'div'} className={styles.error} />
          </div>

          <div className={styles.wrapper}>
            <div className={styles.labelAndFieldContainer}>
              <label htmlFor="password">Senha</label>
              <Field type="password" name="password" className={styles.input} />
            </div>
            <ErrorMessage name="password" component={'div'} className={styles.error} />
          </div>

          {createAccount && (
            <div className={styles.wrapper}>
              <div className={styles.labelAndFieldContainer}>
                <label htmlFor="password">Repita a Senha</label>
                <Field type="password" name="confirmPassword" className={styles.input} />
              </div>
              <ErrorMessage name="confirmPassword" component={'div'} className={styles.error} />
            </div>
          )}
          {message && <p className={styles.success}>{message}</p>}
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <button type="submit" disabled={isSubmitting} className={styles.loginButton}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
