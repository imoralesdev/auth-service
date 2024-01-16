import express from 'express';
import { sessionMiddleware } from './middleware/sessionMiddleware';
import authRouter from './routes/authRouter';

const app = express();
const port = 3000;

app.use(express.json());

// Middleware
app.use(sessionMiddleware);

// Routes
app.use('/', authRouter); // Mount the items router

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});