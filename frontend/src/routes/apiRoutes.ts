const baseUrl: string = 'http://127.0.0.1:3000/api';

const getCommonTaskRoute = (uid: number) => `${baseUrl}/usuarios/${uid}/tarefas`;
const getPatchDeleteSingleTaskRoute = (uid: number, tid: number) =>
  `${baseUrl}/usuarios/${uid}/tarefas/${tid}`;

const markCompletedTaskRoute = (uid: number, tid: number) =>
  `${baseUrl}/usuarios/${uid}/tarefas/${tid}/completa`;

const apiRoutes = {
  login: '/auth/',
  getAllTasks: getCommonTaskRoute,
  postATask: getCommonTaskRoute,
  patchTask: getPatchDeleteSingleTaskRoute,
  deleteTask: getPatchDeleteSingleTaskRoute,
  getSingleTask: getPatchDeleteSingleTaskRoute,
  completeTask: markCompletedTaskRoute,
};

export default apiRoutes;
