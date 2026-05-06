const socket = io();
socket.on('prime', (msg) => {
  console.log('Random prime number:', msg);
  document.getElementById('prime').innerText = msg;
});