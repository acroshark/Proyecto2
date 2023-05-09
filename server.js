require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const {
  newUserController,
  getUserController,
  loginController,
} = require('./controllers/users');

const {
  getTweetsController,
  newTweetController,
  getSingleTweetController,
  deleteTweetController,
} = require('./controllers/tweets');

const { authUser } = require('./middlewares/auth');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//Rutas de usuario
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.post('/login', loginController);

//Rutas de tweets
app.post('/', authUser, newTweetController);
app.get('/', getTweetsController);
app.get('/tweet/:id', getSingleTweetController);
app.delete('/tweet:id', deleteTweetController);

//Middlewere de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

//Middlewere de gestion de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//Lanzamos el servidor
app.listen(3009, () => {
  console.log('Servidor funcionando!');
});
