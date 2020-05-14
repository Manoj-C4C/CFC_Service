// External Imports
const http    = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// Internal Imports
const app = require('./app');
const server = http.createServer(app);
const SocketService = require('./service/socketService');

// Port defined
const PORT = process.env.PORT || 8080;

// Websocket Initialized
SocketService.createWebSocketServer({
  options: {
    httpServer: server,
    autoAcceptConnections: false
  }
})

// Clustering
if (cluster.isMaster) {
  forMaster();
} else {
  forWorker();
}

// For Master Thread
function forMaster() {
  console.log(`         Number of CPUs: ${numCPUs}`);
  console.log(`Starting server on port: ${PORT} \n`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => console.log(`[SIGNAL-${signal} CODE-${code}] worker- ${worker.process.pid} \t died!`));
}

// For Worker Thread
function forWorker () {
  server.listen(PORT, (err) => {
    if (err) {
      console.error(`Error while starting server on port-${PORT}: ${err}`);
      process.exit(1);
    } else {
      console.log(`[WORKER-${process.pid}] Server started successfully!`)
    }
  });
}

// Graceful shutdown
function onApplicationShutdown() {
    // Graceful Shutdown
    process.on('SIGINT', (signal, code) => {
      if (server.listening) {
        server.close((err) => {
          if(err) {
            console.log(`[SIGNAL-${signal} CODE-${code} WORKER-${process.pid}] \t Error while stopping server- ${err}`);
          } else {
            console.log(`[SIGNAL-${signal} CODE-${code} WORKER-${process.pid}] \t Server stopped successfully!`);
          }
        });
      }
    });
}
