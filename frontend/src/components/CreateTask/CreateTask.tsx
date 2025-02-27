import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext } from 'react';
import apiRoutes from '../../routes/apiRoutes';
import axios from 'axios';
import Task from '../../interfaces/Task';
import styles from './CreateTask.module.scss';
import CreateTaskProps from '../../interfaces/CreateTaskProps';
import PayloadProps from '../../interfaces/PayloadProps';
import taskCreationvalidationSchema from './validation.schema';
import { TodoContext } from '../../context/TodoContext';

const CreateTask: React.FC<CreateTaskProps> = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext não está disponível');
  }

  const { uid, token, setTaskList, showingCreateTask, updateShowingCreateTask } = context;

  const handleCloseModal = () => {
    updateShowingCreateTask(false);
  };
  const createNewTask = async (payload: PayloadProps) => {
    const createTaskUrl = apiRoutes.postATask(uid);

    try {
      const response = await axios.post(createTaskUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        const newTask: Task = response.data.data;
        setTaskList((prevTasks: Task[]) => [...prevTasks, newTask]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.blockScreen} style={{ display: showingCreateTask ? 'flex' : 'none' }}>
      <div className={styles.createTaskContainer}>
        <h2>Criar Nova Tarefa</h2>
        <Formik
          initialValues={{ title: '', description: '', status: 'pendente' }}
          validationSchema={taskCreationvalidationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            createNewTask(values as PayloadProps);
            resetForm();
            setSubmitting(false);
            handleCloseModal();
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              {/* Título */}
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

              {/* Descrição */}
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

              <button type="submit" disabled={isSubmitting} className={styles.createButton}>
                Enviar
              </button>
              <button type="button" className={styles.closeTaskCreation} onClick={handleCloseModal}>
                X
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateTask;
