var express = require("express")
const path = require('path');
var app = express()
var port = process.env.PORT || 3002;
app.use(express.static(path.join(__dirname, 'public')));
app.get('/multiply', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send("Invalid input");
  }
  const product = a * b;
  
  
  res.send(`The product of ${a} and ${b} is: ${product}`);
});
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });


