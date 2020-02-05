/** @format */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
const bodyParser = require('body-parser');

const app = express();

import getRoutes from './src/lib/getRoutes';
import Error from './src/error/index';
import checkInitializeProjectSettings from './src/lib/checkInitializeProjectSettings';

app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? '*'
        : process.env.REQUEST_URI || '*'
  })
);

app.use(bodyParser.json({ extended: true }));

checkInitializeProjectSettings();

getRoutes().forEach((data: any) => {
  app.use(data.path || '/', data.router);
});

// 404
app.use((req) => {
  Error.PageNotFound(req.url);
});

// Error handler
app.use((error: any, req: any, res: any, next: any) => {
  const status = error.status || 500;
  const message =
    error.message && error.expose
      ? error.message
      : 'An error has occurred. Please Try Again.';
  const data = error.data || {};
  if (!error.expose || process.env.NODE_ENV === 'development') {
    console.error(error);
  }

  res.status(status).json({
    status,
    message,
    ...data
  });
});

module.exports = app;
