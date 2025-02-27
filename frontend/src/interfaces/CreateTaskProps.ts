import Task from './Task';

interface CreateTaskProps {
  uid: number;
  token: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default CreateTaskProps;
