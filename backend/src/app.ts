import express from 'express';

require('express-async-errors');

const app = express();

app.use(require('modules/Gateway').default);
app.use(require('modules/Error').default);

export default app;
