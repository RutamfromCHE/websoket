const chatbox = document.getElementById('chatbox');
const massegeInput = document.getElementById('messegeImput');
const sendButton = document.getElementById('sendButton');

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Вы подключены к вебсокету');
};

ws.onmessage = event => {
  const message = event.data;
  displayMessege(message);
};

ws.onclose = () =>{
  console.log('Вебсокет отключен')
};

ws.onerror = error => {
  console.error('Websocket error:', error);
};

function displayMessege(message) {
  const newMassege = document.createElement('p');
  newMassege.textContent = message;
  chatbox. appendChild(newMassege);
  chatbox.scrollTop = chatbox.scrollHeight;
}

sendButton.addEventListener('click',sendMessege);
massegeInput.addEventListener('keyup', event =>{
  if(event.key === 'Enter'){
    sendMessege();
  }
});

function sendMessege(){
  const message = massegeInput.value;
  if(message.trim()!== ''){
    ws.send(message);
    massegeInput.value = '';
    displayMessege('Я:' + message);
  }
}