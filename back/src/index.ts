import express from 'express';
import bodyParser from 'body-parser';
import './config';
import cors from 'cors';
import microservicosRoutes from './routes/microservicos';


// import {api_gerador} from '../instaviagem-gerador/functions/src/index.ts';

class AppController {
  express: any;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(bodyParser.json({ limit: '50mb' }));
    this.express.use(cors());
  }

  routes() {
    this.express.use('/api/microservicos', microservicosRoutes);
  }
}

const app = new AppController().express;
const port = process.env.PORT || 3002
app.listen(port);
console.log(`App running on port ${port}`);
