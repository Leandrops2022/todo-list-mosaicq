import { FaCheck, FaPencil, FaTrash } from 'react-icons/fa6';
import Task from '../../../interfaces/Task';
import styles from '../TaskListContainer.module.scss';
import { NavigateFunction } from 'react-router-dom';
import { useState } from 'react';

type TaskComponentProps = {
  task: Task;
  uid: number;
  token: string;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  markCompleted: (
    uid: number,
    taskId: number,
    token: string,
    setTaskList: (value: React.SetStateAction<Task[]>) => void,
  ) => Promise<void>;
  deleteTask: (
    uid: number,
    taskId: number,
    token: string,
    setTaskList: (value: React.SetStateAction<Task[]>) => void,
  ) => Promise<void>;
  navigate: NavigateFunction;
};

const TaskComponent: React.FC<TaskComponentProps> = ({
  task,
  uid,
  token,
  setTaskList,
  markCompleted,
  deleteTask,
  navigate,
}) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);

  return (
    <div
      className={styles.taskCard}
      style={task.status == 'concluida' ? { backgroundColor: 'silver' } : {}}
      onClick={() => {
        setShowDescription((previous) => !previous);
      }}
    >
      <div className={styles.taskContent}>
        <div className={styles.taskHeader}>
          <span>Data de criação: {task.criado_em}</span>
          <span>Status: {task.status}</span>
        </div>
        <div className={styles.taskBody}>
          <h3>{task.titulo}</h3>
        </div>
        <div className={showDescription ? styles.descriptionShow : styles.taskDescriptionHide}>
          <p>{task.descricao}</p>
        </div>
      </div>
      <div className={styles.taskButtons}>
        <FaCheck
          size={12}
          title="Completar tarefa"
          color="green"
          className={styles.checkButton}
          onClick={() => markCompleted(uid, task.id, token, setTaskList)}
        />

        <FaPencil
          size={12}
          title="Editar Tarefa"
          color="brown"
          className={styles.editButton}
          onClick={() => {
            navigate(`/tarefas/${task.id}`);
          }}
        />

        <FaTrash
          size={12}
          title="Remover tarefa"
          color="red"
          className={styles.deleteButton}
          onClick={() => deleteTask(uid, task.id, token, setTaskList)}
        />
      </div>
    </div>
  );
};

export default TaskComponent;
