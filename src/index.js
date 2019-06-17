  const express = require('express');
  const mongoose = require('mongoose');
  const path = require('path');
  const cors = require('cors');

  const app = express();

  const corsOptions = {
    origin: 'https://ph0togram.herokuapp.com',
    optionsSuccessStatus: 200
}

  const server = require('https').Server(app);
  const io = require('socket.io')(server);

  mongoose.connect('mongodb+srv://pyhooma:pyhooma@cluster0-srqgg.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
  });

  app.use((req, res, next) => {
    req.io = io;

    next();
  })

  app.use(cors(corsOptions));

  app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

  app.use(require('./routes'));

  server.listen(443);

