const http = require('http');
const app = require('./app');

const PORT = process.env.PORT;
const HOST = process.env.HOST || '0.0.0.0';

const httpServer = http.createServer(app);

httpServer.listen(PORT, HOST, () =>
  console.log(`Server is listening http://${HOST}:${PORT}`)
);
