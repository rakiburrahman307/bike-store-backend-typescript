import app from './app';
import { Server } from 'http';
import mongoose from 'mongoose';
import config from './config/config';
let server: Server;
async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URL);
    console.log('Connected to MongoDB.');

    // Start the server
    server = app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

main();
process.on('unhandledRejection', () => {
  console.log(`😈 unhandled Rejection is detected, shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1); // Exits with failure code
    });
  }
  process.exit(1); // Immediate exit if no server exists
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected, shutting down ...`);
  process.exit(1);
});
