const http = require('http');
const app = require('./app');

const PORT = process.env.PORT;
const HOST = process.env.HOST || '0.0.0.0';

const httpServer = http.createServer(app);

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send("✅ Database connected successfully");
  } catch (error) {
    res.status(500).send("❌ Database Error: " + error.message);
  }
});

httpServer.listen(PORT, HOST, () =>
  console.log(`Server is listening http://${HOST}:${PORT}`)
);
