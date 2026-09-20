import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import { execSync } from 'child_process';
import app from './app.js';
import config from './config/index.js';
import logger from './utils/logger.js';
import socketServer from './sockets/index.js';

dotenv.config();

const server = http.createServer(app);
const io = socketServer(server);

const startServer = async () => {
  try {
    await mongoose.connect(config.mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB Atlas');

    // Listen on the configured port and fail fast if it's unavailable.
    // Provide a helpful diagnostic listing the occupying process when possible.
    server.on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        logger.error(`Port ${config.port} is already in use.`);
        try {
          const cmd = `lsof -i :${config.port} -sTCP:LISTEN -n -P`;
          const out = execSync(cmd, { encoding: 'utf8' }).trim();
          logger.error('Process(es) listening on the port:\n' + out);
        } catch (ex) {
          logger.error('Unable to determine occupying process:', ex);
        }
        logger.error('Please free the port and restart the server.');
        process.exit(1);
      }
      logger.error('Server error', err);
      process.exit(1);
    });

    server.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Server startup failed', error);
    process.exit(1);
  }
};

startServer();

export { server, io };
