import express, { Express } from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import { engine } from 'express-handlebars';
import path from 'path';
import axios from 'axios'
import './envConfig' 

const corsAddresses: string[] = [
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:3300',
  ];

// ### Environment variables
const production = process.env.NODE_ENV === 'production';
const {
    DBUSER,
    DBPW
} = process.env as { [varName: string]: string };

const config = {
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  headers: {
      'Content-Type': 'application/json',
  },
};

// App
class AppController {
    express: Express;
  
    constructor() {
      this.express = express();
      this.middlewares();
    }
  
    middlewares() {
      this.express.use(bodyParser.json({ limit: '50mb' }));
      this.express.use(bodyParser.urlencoded({ extended: true }));
    }
}
const app: Express = new AppController().express;
if (production) {
  app.use(cors({ origin: corsAddresses }));
} else {
  app.use(cors({ origin: true }));
}

app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }
    try {
        res.status(200).render('start', {return: JSON.stringify({})});
    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message)
    }
});

app.get('/insert', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }
    try {
      const endpoint = 'http://localhost:8080/start';
      const { data } = await axios.get(endpoint);
        res.status(200).render('start', {return: JSON.stringify(data)});
    } catch (error: any) {
        console.log(error);
        res.status(500).send(error.message)
    }
});

app.post('/insert', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }
  try {
      const endpoint = 'http://localhost:8080/';
      const imput = req.body
      const { data } = await axios.post(endpoint, imput, config);
      res.status(200).render('start', { return: JSON.stringify(data) });
  } catch (error: any) {
      console.log(error);
      res.status(500).send(error.message);
  }
});

app.get('/update', async (req, res) => {
  const endpoint = 'http://localhost:8080/update';
  const { id } = req.query
  const { data } = await axios.post(endpoint, { id }, config);
  res.render('update', { return: JSON.stringify(data) });
});

app.post('/register-update', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }
  try {
      const endpoint = 'http://localhost:8080/register-update';
      const imput = req.body
      await axios.post(endpoint, imput, config);
      res.status(200).redirect('/insert');
  } catch (error: any) {
      console.log(error);
      res.status(500).send(error.message);
  }
});

app.get('/delete', async (req, res) => {
  const endpoint = 'http://localhost:8080/delete';
  const { id, rev } = req.query
  const { data } = await axios.post(endpoint, { id, rev }, config);
  res.status(200).redirect('/insert');
});

app.listen(3300, () => {
  console.log('app listen on 3300');
});