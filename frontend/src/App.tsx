import TodoContextProvider from './context/TodoContextProvider';
import AppRouter from './routes/routes';

function App() {
  return (
    <TodoContextProvider>
      <AppRouter />
    </TodoContextProvider>
  );
}

export default App;
