import express from 'express';
import { app } from '.';

const appExpress = express();
appExpress.use('/', app);
const port = process.env.PORT || 8080;
appExpress.listen(port);
console.log(`App running on port ${port} - ${process.env.NODE_ENV}`);
