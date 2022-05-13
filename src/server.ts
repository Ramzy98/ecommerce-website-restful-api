import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import user_route from './handlers/users';
import product_route from './handlers/products';

dotenv.config();
const app: express.Application = express();
const PORT = process.env.PORT!;
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.json('Hello World!');
});

user_route(app);
product_route(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
