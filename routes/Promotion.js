const express = require('express');
const router = express.Router();
const Code = require('./models/Code');
const User = require('./models/User');

router.post('/check-code', async (req, res) => {
  try {
    const { code, userId } = req.body;
    const promotionCode = await Code.findOne({ code });
    
    if (!promotionCode) {
      return res.status(404).json({ msg: 'Código no encontrado' });
    }
    
    if (promotionCode.used) {
      return res.status(400).json({ msg: 'Este código ya ha sido utilizado' });
    }
    
    promotionCode.used = true;
    promotionCode.usedBy = userId;
    await promotionCode.save();
    
    res.json({ msg: '¡Felicidades! Has ganado', prize: promotionCode.prize });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;