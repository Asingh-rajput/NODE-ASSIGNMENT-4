const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({ status: 'success', message: 'Hello world!' });
});


app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  const sum = parseFloat(num1) + parseFloat(num2);
  const message = `the sum of given two numbers`;
  const status = getStatus(num1, num2, sum);
  console.log(sum)
  if (status === 'error') {
    return res.status(400).send({ status, message });
  }
  
  return res.send({ status, message, sum });
});


app.post('/sub', (req, res) => {
  const { num1, num2 } = req.body;
  const difference = parseFloat(num1) - parseFloat(num2);
  const message = `the difference of given two numbers`;
  const status = getStatus(num1, num2, difference);
  
  if (status === 'error') {
    return res.status(400).send({ status, message });
  }
  
  return res.send({ status, message, difference });
});


app.post('/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  const result = parseFloat(num1) * parseFloat(num2);
  const message = `The product of given numbers`;
  const status = getStatus(num1, num2, result);
  
  if (status === 'error') {
    return res.status(400).send({ status, message });
  }
  
  return res.send({ status, message, result });
});


app.post('/divide', (req, res) => {
  const { num1, num2 } = req.body;
  if (parseFloat(num2) === 0) {
    return res.status(400).send({ status: 'error', message: 'Cannot divide by zero' });
  }
  const result = parseFloat(num1) / parseFloat(num2);
  const message = `The division of given numbers`;
  const status = getStatus(num1, num2, result);
  
  if (status === 'error') {
    return res.status(400).send({ status, message });
  }
  return res.send({ status, message, result });
});

const getStatus = (num1, num2, result) => {
  if (isNaN(num1) || isNaN(num2)) {
    return 'error';
  }
  if (result < -1000000 || result > 1000000) {
    return 'error';
  }
  return 'success';
};
app.listen(port, () => console.log(`App listening on port ${port}!`))
module.exports=app;