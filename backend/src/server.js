import app from './app.js';
import mongoose from 'mongoose';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(`${err}`);
  server.close(() => {
    process.exit(1);
  });
});

const PORT = 3222;

mongoose
  .connect('key_to_db', { // Replace "key_to_db" with the real key
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend Server ready at http://localhost:${PORT}`);
    });
  })
  .catch((error) => { 
    console.error('Error connecting to MongoDB:', error);
  });
