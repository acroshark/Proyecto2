require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el módulo CORS
const routes = require('./controllers/Routes');
const app = express();
const port = process.env.PORT || 3006;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Agrega el middleware de CORS
app.use(cors());
routes(app);
app.listen(port, () =>
  console.log(`Servidor funcionando en http://localhost:${port} :fantasma:`)
);
module.exports = app;
