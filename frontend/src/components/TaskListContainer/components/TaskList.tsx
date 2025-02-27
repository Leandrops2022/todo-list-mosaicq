import React, { useContext, useMemo, useState } from 'react';
import styles from '../TaskListContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../../../context/TodoContext';
import { deleteTask, filterTasks, markCompleted, sortTasks } from '../utils';
import TaskComponent from './TaskComponent';

interface TaskListProps {
  filter: string;
}

const TaskList: React.FC<TaskListProps> = ({ filter }) => {
  const [ascending, setAscending] = useState<boolean>(false);
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext is not available');
  }

  const { uid, token, setTaskList, taskList } = context;



  const handleDragStart = (event: React.DragEvent<HTMLLIElement>, taskId: number) => {
    event.dataTransfer.setData('text/plain', String(taskId));
  };

  const receivedTasks = useMemo(() => {
    const filtered = filterTasks(taskList, filter);
    return filtered;
  }, [taskList, filter]);

  const sortedTasks = useMemo(() => {
    const tasksCopy = [...receivedTasks];
    sortTasks(tasksCopy, ascending);
    return tasksCopy;
  }, [receivedTasks, ascending]);

  const navigate = useNavigate();

  return (
    <div className={styles.taskListBoard}>
      <div className={styles.orderDiv}>
        <span>Data de criação: </span>
        <select
          className={styles.selectOrder}
          name="ordem"
          id="ordem"
          onChange={(evt) => {
            const value = evt.target.value === 'true' ? true : false;
            setAscending(value);
          }}
          defaultValue={'false'}
        >
          <option value="false">mais recentes</option>
          <option value="true">mais antigas</option>
        </select>
      </div>
      <ul className={styles.taskList}>
        {sortedTasks.length > 0 &&
          sortedTasks.map((task) => (
            <li
              key={task.id}
              id={`${task.id}`}
              draggable={true}
              onDragStart={(event) => handleDragStart(event, task.id)}
            >
              <TaskComponent
                task={task}
                uid={uid}
                token={token}
                setTaskList={setTaskList}
                markCompleted={markCompleted}
                deleteTask={deleteTask}
                navigate={navigate}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskList;
