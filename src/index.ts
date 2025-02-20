import { initializeDatabase } from './database/dataSource';
import app from './server';
import 'reflect-metadata';

const PORT = process.env.PORT || 3000;

initializeDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
