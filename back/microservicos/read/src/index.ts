import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dbtransactions from './../../others/dbtransactions';

const corsAddresses: string[] = [
  'http://localhost:3300',
];

class AppController {
  express: Express;

  constructor() {
    this.express = express();
    this.middlewares();
  }

  middlewares() {
    this.express.use(bodyParser.json({ limit: '50mb' }));
  }
}

// ### Environment variables
const production = process.env.NODE_ENV === 'production';

const app: Express = new AppController().express;
if (production) {
  app.use(cors({ origin: corsAddresses }));
} else {
  app.use(cors({ origin: true }));
}

app.post('/', async (req, res) => {
  res.set('Access-Controll-Allow-Origin', '*');
  res.set('Access-Controll-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }
  try {
    const { name, email, age, nice }: 
    { name: string, email: string, age: number, nice: boolean } = { ...req.body };
    const args = { name, email, age, nice }
    await dbtransactions.resolvers.Mutation.createRecord('', args);
    const dataReturn = await dbtransactions.resolvers.Query.findAll();
    return res.status(200).send(dataReturn);
  } catch (error: any) {
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(error));
    return res.status(500).send(error.message);
  }
});

app.get('/start', async (req, res) => {
  res.set('Access-Controll-Allow-Origin', '*');
  res.set('Access-Controll-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }
  try {
    const dataReturn = await dbtransactions.resolvers.Query.findAll();
    return res.status(200).send(dataReturn);
  } catch (error: any) {
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(error));
    return res.status(500).send(error.message);
  }
});

app.post('/update', async (req, res) => {
  res.set('Access-Controll-Allow-Origin', '*');
  res.set('Access-Controll-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }
  try {
    const id: 
    { id: string } = { ...req.body };
    const dataReturn = await dbtransactions.resolvers.Query.findSingle('', id);
    return res.status(200).send(dataReturn);
  } catch (error: any) {
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(error));
    return res.status(500).send(error.message);
  }
});

app.post('/register-update', async (req, res) => {
  res.set('Access-Controll-Allow-Origin', '*');
  res.set('Access-Controll-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }
  try {
    const { id, rev, name, email, age, nice }: 
    { id: string, rev: string, name: string, email: string, age: number, nice: boolean } = { ...req.body };
    const data = { name, email, age, nice }
    const dataReturn = await dbtransactions.resolvers.Mutation.update('', {id, rev, data, updated: true});
    return res.status(200).send(dataReturn);
  } catch (error: any) {
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(error));
    return res.status(500).send(error.message);
  }
});

app.post('/delete', async (req, res) => {
  res.set('Access-Controll-Allow-Origin', '*');
  res.set('Access-Controll-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }
  try {
    const { id, rev }: 
    { id: string; rev: string } = { ...req.body };
    const dataReturn = await dbtransactions.resolvers.Mutation.delete('', {id, rev});
    return res.status(200).send(dataReturn);
  } catch (error: any) {
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(error));
    return res.status(500).send(error.message);
  }
});

export default app;
export {
  app,
};
