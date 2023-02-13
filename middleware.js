//Questao 7

const express = require('express');
const app = express();

// Define o middleware de registro
const logMiddleware = function(req, res, next) {
  console.log(`Método HTTP: ${req.method}`);
  next();
};

// Aplica o middleware a todas as rotas
app.use(logMiddleware);

// Controladores para as rotas
app.get('/', (req, res) => {
  res.send('Página inicial');
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
