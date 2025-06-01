const express = require('express');
const cors = require('cors');
const { STATIC_PATH } = require('./constants');
const { errorHandlers } = require('./middleware');
const router = require('./routes');

const app = express();
const corsOptopns = {
  origin: '*',
};
app.use(cors(corsOptopns));

app.use(express.static(STATIC_PATH));

app.use(express.json());

app.use('/api', router);

app.use(errorHandlers.dbErrorHandler, errorHandlers.errorHandler);

module.exports = app;
