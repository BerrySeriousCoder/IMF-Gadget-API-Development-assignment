import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import gadgetsRouter from './routes/gadgets';
import authRouter from './routes/auth';
import { authenticateToken } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/gadgets', authenticateToken, gadgetsRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('IMF Gadget API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
