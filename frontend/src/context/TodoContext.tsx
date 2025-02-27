import { createContext, Dispatch, SetStateAction } from 'react';
import Task from '../interfaces/Task';

interface AppContextType {
  token: string;
  username: string;
  uid: number;
  taskList: Task[];
  createAccount: boolean;
  showingCreateTask: boolean;

  updateToken: (token: string) => void;
  updateUserName: (username: string) => void;
  updateUid: (id: number) => void;
  setTaskList: Dispatch<SetStateAction<Task[]>>;
  updateShowingCreateTask: (value: boolean) => void;
  setAccountCreation: () => void;
  refreshTasks: boolean,
  setRefreshTasks: React.Dispatch<React.SetStateAction<boolean>>,
}

export const TodoContext = createContext<AppContextType | null>(null);
