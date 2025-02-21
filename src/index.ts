import { initializeDatabase } from './database/dataSource';
import app from './server';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const PORT = process.env.PORT || 3000;

initializeDatabase();

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
