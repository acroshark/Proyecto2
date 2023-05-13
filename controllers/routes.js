const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../users/userModel');
const linkModel = require('../models/linkModel');
const voteModel = require('../models/voteModel');
const authMiddleware = require('../middleware/auth');
const routes = (app) => {
  //Registro de nuevo usuario
  app.post('/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(password, name, email);
    console.log(req.body);
    // Validar longitud y complejidad de contraseña
    if (
      password.length > 10 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      return res.status(400).json({
        message:
          'Password must be 10 characters or less and contain at least one uppercase letter and one number',
      });
    }
    let [result] = await userModel.findByEmail(email);
    console.log(result);
    if (result.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    } else {
      const hash = await bcrypt.hash(password, 10);
      let userResult = await userModel.create(name, email, hash);
      console.log(userResult);
      const user = {
        id: userResult.insertId,
        name: name,
        email: email,
      };
      const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(200).json({ token: token });
      console.log('test2');
    }
  });
  // Login de usuarios
  app.post('/login', async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const [result] = await userModel.findByEmail(email);
      if (result.length === 0) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        const user = result[0];
        const match = await bcrypt.compare(password, user.password);
        if (match === true) {
          const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
            expiresIn: '30d',
          });
          res.status(200).json({ token: token });
        } else {
          res.status(401).json({ message: 'Invalid email or password' });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  // obtener todos los enlaces publicados hoy y en días anteriores
  app.get('/links', authMiddleware, async (req, res) => {
    console.log(req.query);
    const { date } = req.query;
    if (!date) {
      res.status(400).json({ message: 'date required' });
    }
    try {
      const result = await linkModel.find(date);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving links' });
    }
  });
  //Crear un nuevo link
  app.post('/links', authMiddleware, async (req, res) => {
    console.log('links');
    const title = req.body.title;
    const url = req.body.url;
    const description = req.body.description;
    const user = req.user;
    console.log(req.body);
    if (!user) {
      res.status(401).json({ message: 'You must be logged in to do that' });
    } else {
      try {
        const result = await linkModel.create(user.id, url, title, description);
        console.log(result);
        res
          .status(200)
          .json({ message: 'Creado correctamente', id: result.insertId });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  });
  // Borrar un enlace publicado por el usuario
  app.delete('/links/:id', authMiddleware, async (req, res) => {
    try {
      const linkId = req.params.id;
      const user = req.user;
      const [result] = await linkModel.findById(linkId);
      if (!result) {
        return res.status(404).json({ message: 'Link not found' });
      }
      const link = result;
      console.log(link);
      if (link.userId !== user.id) {
        return res
          .status(403)
          .json({ message: 'You are not authorized to perform this action' });
      }
      await linkModel.delete(linkId);
      res.status(200).json({ message: 'Link deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  // Votar por un link
  app.post('/links/:id/vote', authMiddleware, async (req, res) => {
    const linkId = req.params.id;
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: 'You must be logged in to do that' });
    } else {
      try {
        // Verificar si el usuario ya votó para este enlace
        const existingVote = await voteModel.findByLinkIdAndUserId(
          linkId,
          user.id
        );
        if (existingVote) {
          // Eliminar el voto existente
          await voteModel.delete(existingVote.id);
          res.status(200).json({ message: 'Vote removed successfully' });
        } else {
          // Crear un nuevo voto
          await voteModel.create(linkId, user.id);
          res.status(200).json({ message: 'Vote added successfully' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error voting for link' });
      }
    }
  });
  //Editar perfil usuario
  app.put('/users', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id;
      const name = req.body.name;
      const email = req.body.email;
      let password = req.body.password;
      // Validar longitud y complejidad de contraseña
      if (
        password &&
        (password.length > 10 ||
          !/[A-Z]/.test(password) ||
          !/[0-9]/.test(password))
      ) {
        return res.status(400).json({
          message:
            'Password must be 10 characters or less and contain at least one uppercase letter and one number',
        });
      }
      // Verificar si se proporcionó una nueva contraseña
      if (password) {
        password = await bcrypt.hash(password, 10);
      }
      await userModel.update(userId, name, email, password);
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
};
module.exports = routes;
