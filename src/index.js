  const express = require('express');
  const mongoose = require('mongoose');
  const path = require('path');
  const cors = require('cors');

  const app = express();


var whitelist = ['https://ph0togram-api.herokuapp.com', 'https://ph0togram.herokuapp.com', '177.8.54.132']

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
      optionsSuccessStatus: 200
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
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

