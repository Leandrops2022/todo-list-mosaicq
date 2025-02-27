import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from '../components/Home/HomeScreen';
import TaskListContainer from '../components/TaskListContainer/TaskListContainer';
import EditTaskForm from '../components/EditTaskForm/EditTaskForm';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<HomeScreen />} />
        <Route path="/dashboard" element={<TaskListContainer />} />
        <Route path="/tarefas/:tid" element={<EditTaskForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
