import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/error.middlewares.js';

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use('/', routes);
app.use(errorMiddleware);

export default app;

