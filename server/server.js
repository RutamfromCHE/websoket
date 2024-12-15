// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Новый клиент подключился');
    
    // Отправить приветственное сообщение новому клиенту
    ws.send('Привет! Добро пожаловать в чат.');

    // Обработка получения сообщения от клиента
    ws.on('message', (message) => {
        console.log('Получено сообщение: ' + message);

        // Пересылка сообщения всем подключенным клиентам
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Обработка отключения клиента
    ws.on('close', () => {
        console.log('Клиент отключился');
    });
});

console.log('Сервер запущен на ws://localhost:8080');
