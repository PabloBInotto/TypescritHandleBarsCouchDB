import express from 'express';

import { app as read } from '../../microservicos/read'

const app = express();

app.use('/read', read);

export default app;
