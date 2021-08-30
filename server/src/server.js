const http = require('http');
const mongoose = require('mongoose');

const MONGO_PW = require('./config');

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = `mongodb+srv://nasa-api:${MONGO_PW}@nasa.awiix.mongodb.net/nasa?retryWrites=true&w=majority`;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready...');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

const startServer = async () => {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
};

startServer();
