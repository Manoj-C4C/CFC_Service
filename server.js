const http = require('http');

const app = require('./app');

const SocketService = require('./service/socketService');

const server = http.createServer(app);

SocketService.createWebSocketServer({
  options: {
    httpServer: server,
    autoAcceptConnections: false
  }
})

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
