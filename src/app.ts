import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express()


// parser
app.use(express.json());
app.use(cors());

// routes
app.use('/api', router)


app.get('/', (req: Request, res: Response) => {
    res.send('Winning isn’t everything, but wanting to win is!')
})

// global Error Handler
app.use(globalErrorHandler)


export default app;