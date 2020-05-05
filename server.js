const http = require('http');

const app = require('./app');

var server = http.createServer(app);
const WebSocketServer = require('websocket').server;

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
});

wsServer.on('request', function (request) {
  const connection = request.accept(null, request.origin);

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      setInterval(() => {
        connection.sendUTF('Hi this is WebSocket server!');
      }, 2000)
    }
    else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
    }


  });
  connection.on('close', function (reasonCode, description) {
    console.log('Client has disconnected.');
  });
});


