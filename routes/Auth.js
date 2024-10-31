const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./models/User');

router.post('/register', async (req, res) => {
  try {
    const { name, cedula, email, password, birthDate } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }
    user = new User({
      name,
      cedula,
      email,
      password,
      birthDate
    });
    await user.save();
    res.json({ msg: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    res.json({ msg: 'Inicio de sesión exitoso', userId: user._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;