const express = require("express");
const app = express();

app.get("/:operation/:num1/:num2", (req, res) => {
  const operation = req.params.operation;
  const num1 = parseFloat(req.params.num1);
  const num2 = parseFloat(req.params.num2);

  let result;
  switch (operation) {
    case "sum":
      result = num1 + num2;
      break;
    case "sub":
      result = num1 - num2;
      break;
    case "multi":
      result = num1 * num2;
      break;
    case "div":
      result = num1 / num2;
      break;
    default:
      result = "Operação Inválida";
  }

  res.send(`Resultado: ${result}`);
});

app.listen(3000, () => {
  console.log("Aplicação rodando na porta 3000");
});
