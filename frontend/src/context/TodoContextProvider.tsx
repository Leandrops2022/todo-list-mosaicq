import React, { useState, ReactNode } from 'react';
import { TodoContext } from './TodoContext';
import Task from '../interfaces/Task';

interface TodoContextProviderProps {
  children: ReactNode;
}

export const TodoContextProvider: React.FC<TodoContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [createAccount, setCreateAccount] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [uid, setUid] = useState<number>(0);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [showingCreateTask, setShowingCreateTask] = useState<boolean>(false);
  const [refreshTasks, setRefreshTasks] = useState<boolean>(false);

  const updateToken = (newToken: string) => setToken(newToken);
  const updateUserName = (username: string) => setUsername(username);
  const updateUid = (id: number) => setUid(id);
  const updateShowingCreateTask = (value: boolean) => setShowingCreateTask(value);

  const setAccountCreation = () => setCreateAccount(!createAccount);

  return (
    <TodoContext.Provider
      value={{
        token,
        username,
        uid,
        taskList,
        updateToken,
        updateUserName,
        updateUid,
        setTaskList,
        createAccount,
        setAccountCreation,
        showingCreateTask,
        updateShowingCreateTask,
        refreshTasks,
        setRefreshTasks,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
