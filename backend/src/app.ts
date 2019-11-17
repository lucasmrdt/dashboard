import express from 'express';

require('express-async-errors');

const app = express();

app.use(require('@/Gateway').default);
app.use(require('@/Error').default);

export default app;
