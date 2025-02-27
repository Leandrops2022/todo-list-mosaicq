import Task from '../../interfaces/Task';
import apiRoutes from '../../routes/apiRoutes';
import axios from 'axios';

export const deleteTask = async (
  uid: number,
  taskId: number,
  token: string,
  setTaskList: (value: React.SetStateAction<Task[]>) => void,
) => {
  const url = apiRoutes.deleteTask(uid, taskId);
  const response = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });

  if (response.status == 200) {
    setTaskList((prevTasks: Task[]) => prevTasks.filter((task: Task) => task.id !== taskId));
  }
};

export const markCompleted = async (
  uid: number,
  taskId: number,
  token: string,
  setTaskList: (value: React.SetStateAction<Task[]>) => void,
) => {
  const url = apiRoutes.completeTask(uid, taskId);
  const result = await axios.patch(url, {}, { headers: { Authorization: `Bearer ${token}` } });

  if (result.status == 200) {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status: 'concluida' } : task)),
    );
  }
};

export const showCreateTask = (updateShowingCreateTask: (value: boolean) => void) => {
  updateShowingCreateTask(true);
};

export const filterTasks = (tasklist: Task[], value: string) => {
  return tasklist.filter((task) => task.status === value);
};

export const normalizeDate = (dateStr: string): string => {
  const [day, month, year] = dateStr.split('/');
  return `${year}${month}${day}`;
};

export const sortTasks = (taskList: Task[], ascending: boolean) => {
  if (ascending) {
    taskList.sort((a, b) => {
      return normalizeDate(a.criado_em).localeCompare(normalizeDate(b.criado_em));
    });
    return;
  }

  taskList.sort((a, b) => {
    return normalizeDate(b.criado_em).localeCompare(normalizeDate(a.criado_em));
  });
};

export const updateTaskStatus = async (
  uid: number,
  tid: number,
  newStatus: string,
  token: string,
  setTaskList: (value: React.SetStateAction<Task[]>) => void,
) => {
  const url = apiRoutes.patchTask(uid, tid);
  const payload = {
    id: tid,
    status: newStatus,
  };
  const response = await axios.patch(url, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status == 200) {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => (task.id === tid ? { ...task, status: newStatus } : task)),
    );
  }
};

  export const fetchUserTasks = async (uid: number, token:string, isMounted:boolean, setTaskList: React.Dispatch<React.SetStateAction<Task[]>>, setErrorMessage:React.Dispatch<React.SetStateAction<string>>) => {
      try {
        const allTasksUrl = apiRoutes.getAllTasks(uid);

        const response = await axios.get(allTasksUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (isMounted && response.status === 200) {
          setTaskList(response.data.data);
        }
      } catch (error) {
        if (isMounted) {
          console.log(error);
          setErrorMessage('Ocorreu um erro, tente novamente mais tarde');
        }
      }
    };
