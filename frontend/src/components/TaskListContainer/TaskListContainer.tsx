import React, { useContext, useEffect, useState } from 'react';

import { TodoContext } from '../../context/TodoContext';
import styles from './TaskListContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import CreateTask from '../CreateTask/CreateTask';
import { fetchUserTasks, showCreateTask, updateTaskStatus } from './utils';
import TaskList from './components/TaskList';

const TaskListContainer: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
   
  const [message, setMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'pendente' | 'em progresso' | 'concluida'>('pendente');

  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext is not available');
  }

  const { uid, username, token, taskList, setTaskList, updateShowingCreateTask, refreshTasks } = context;
  const navigate = useNavigate();

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedItemId = event.dataTransfer.getData('text/plain');
    const droppedZone = event.currentTarget.id;
    updateTaskStatus(uid, parseInt(droppedItemId), droppedZone, token, setTaskList);
  };

  useEffect(() => {
    let isMounted = true;

    if (token) {
      fetchUserTasks(uid, token, isMounted, setTaskList,setErrorMessage);
    } else {
      navigate('/');
    }

    return () => {
      isMounted = false;
    };
  }, [uid, token, navigate, setTaskList, refreshTasks]);

useEffect(() => {
  if (message || errorMessage) {
    const timer = setTimeout(() => {
      setMessage('');
      setErrorMessage('');
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [message, errorMessage]);

  return (
    <div id="main" className={styles.main}>
      <h1>Bem vindo(a) {username}! </h1>
      <h2>Suas Tarefas:</h2>
      <div className={styles.taskListContainer}>
        {errorMessage && <p style={{color: 'red', textAlign: 'center'}}> {errorMessage} </p>}
        {message && <p style={{color:'green',textAlign: 'center'}}> {message} </p>}

        <div className={styles.tabsDiv}>
          <ul className={styles.tabsList}>
            <li
              key={'pendente'}
              className={activeTab == 'pendente' ? styles.activeTab : styles.inactiveTab}
              onClick={() => {
                setActiveTab('pendente');
              }}
            >
              Pendentes
            </li>

            <li
              key={'em progresso'}
              className={activeTab == 'em progresso' ? styles.activeTab : styles.inactiveTab}
              onClick={() => {
                setActiveTab('em progresso');
              }}
            >
              Em andamento
            </li>

            <li
              key={'concluida'}
              className={activeTab == 'concluida' ? styles.activeTab : styles.inactiveTab}
              onClick={() => {
                setActiveTab('concluida');
              }}
            >
              Concluídas
            </li>
          </ul>
        </div>
        <div className={styles.taskBoards}>
          <div
            id="pendente"
            className={
              activeTab == 'pendente' ? styles.allTasksContainer : styles.noDisplayOnlyInResponsive
            }
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={styles.boardHeader}>
              <h2>Pendentes</h2>
              <button
                title="Adicionar tarefa"
                className={styles.addTaskButton}
                onClick={() => showCreateTask(updateShowingCreateTask)}
              >
                +
              </button>
            </div>
            <TaskList filter={'pendente'} />
          </div>

          <div
            id="em progresso"
            className={
              activeTab == 'em progresso'
                ? styles.allTasksContainer
                : styles.noDisplayOnlyInResponsive
            }
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={styles.boardHeader}>
              <h2>Em Andamento</h2>
            </div>
            <TaskList filter={'em progresso'} />
          </div>

          <div
            id="concluida"
            className={
              activeTab == 'concluida' ? styles.allTasksContainer : styles.noDisplayOnlyInResponsive
            }
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={styles.boardHeader}>
              <h2>Concluídas</h2>
            </div>
            <TaskList filter={'concluida'} />
          </div>
        </div>
      </div>

      <CreateTask
        uid={uid}
        token={token}
        setMessage={setMessage}
        setErrorMessage={setErrorMessage}
        taskList={taskList}
        setTaskList={setTaskList}
      />
    </div>
  );
};

export default TaskListContainer;
