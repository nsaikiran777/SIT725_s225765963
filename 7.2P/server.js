const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

// Generate a random prime between min and max
function isPrime(n) {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function getRandomPrime(min = 2, max = 1000) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (!isPrime(num));
  return num;
}

io.on('connection', (socket) => {
  console.log('Client connected');

  const interval = setInterval(() => {
    const prime = getRandomPrime(2, 1000);
    socket.emit('prime', prime);
  }, 2000);

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

http.listen(3000, () => console.log('Server running on http://localhost:3000'));