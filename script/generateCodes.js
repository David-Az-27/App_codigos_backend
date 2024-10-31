const mongoose = require('mongoose');
const Code = require('./models/Code');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generateCodes = async () => {
  const codes = [];
  const prizes = [
    ...Array(50).fill(1000000),
    ...Array(150).fill(200000),
    ...Array(200).fill(50000),
    ...Array(600).fill(0)
  ];
  
  for (let i = 0; i < 1000; i++) {
    const code = Math.floor(100 + Math.random() * 900).toString();
    codes.push({
      code,
      prize: prizes[i]
    });
  }
  
  await Code.insertMany(codes);
  console.log('Códigos generados exitosamente');
  process.exit();
};

generateCodes();