import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import taskCreationvalidationSchema from './validation.schema';
import PayloadProps from '../../interfaces/PayloadProps';
import { TodoContext } from '../../context/TodoContext';
import apiRoutes from '../../routes/apiRoutes';
import axios from 'axios';
import styles from './TaskDetails.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { fetchUserTasks } from '../TaskListContainer/utils';

const EditTaskForm: React.FC = () => {
  const [initialValues, setInitialValues] = useState<PayloadProps>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('O contexto não foi carregado corretamente');
  }

  const { uid, token, setRefreshTasks, setTaskList } = context;
  const { tid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getTaskData = async () => {
      const response = await axios.get(apiRoutes.getSingleTask(uid, parseInt(tid!)), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        const task = response.data.data;
        setInitialValues({
          title: task.titulo,
          description: task.descricao,
          status: task.status,
        });
      }
    };
    getTaskData();

  }, [tid, token, uid]);

  useEffect(()=>{
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 2000);
  
      return () => clearTimeout(timer);
    }},[errorMessage]);

  const updateTask = async (payload: PayloadProps) => {
    const updateTaskUrl = apiRoutes.patchTask(uid, parseInt(tid!));
    const updatePayload = { ...payload, id: tid };
    try {
      await axios.patch(updateTaskUrl, updatePayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchUserTasks(uid, token, true, setTaskList, setErrorMessage);

    } catch (error) {
      console.log(error);
      setErrorMessage('Ocorreu um erro, tente novamente mais tarde')
    }
  };

  return (
    <div>
      <div className={styles.editHeader}>
        <button className={styles.goBackButton} onClick={() => navigate(-1)}>
          <FaArrowLeft size={30} title="Voltar" /> Voltar
        </button>
        <div className={styles.titleDiv}>
          <h1>Editar Tarefa</h1>
          {errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}
        </div>
      </div>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={taskCreationvalidationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            updateTask(values);
            setRefreshTasks((prev) => !prev);
            resetForm();
            setSubmitting(false);
            navigate('/dashboard', { replace: true });
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.fieldDiv}>
                <label htmlFor="title">Título</label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Digite o título"
                  className={styles.field}
                />
                <ErrorMessage name="title" component="div" className={styles.errorMessage} />
              </div>

              <div className={styles.textAreaDiv}>
                <label htmlFor="description">Descrição</label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Digite a descrição"
                  className={styles.textAreaField}
                  rows={10}
                />
                <ErrorMessage name="description" component="div" className={styles.errorMessage} />
              </div>

              <div className={styles.formStatusDiv}>
                <label htmlFor="status">Status</label>
                <Field as="select" name="status" className={styles.optField}>
                  <option value="pendente">Pendente</option>
                  <option value="em progresso">Em Andamento</option>
                  <option value="concluida">Concluída</option>
                </Field>
                <ErrorMessage name="status" component="div" />
              </div>

              <button type="submit" disabled={isSubmitting} className={styles.sendButton}>
                Salvar
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditTaskForm;
