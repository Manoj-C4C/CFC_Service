const WebSocketServer = require('websocket').server;
const {v1: uuidv1} = require('uuid');

class SocketService {
    connection;
    connections;
    constructor() {
       this.connection = null;
       this.connections = new Map();
    }
   
    createWebSocketServer = (config) => {
        const ws = new WebSocketServer(config.options)
        ws.on('request', this.onConnectionRequest); 
    }

    onConnectionRequest = (request) => {
        const connection = request.accept(null, request.origin);
        this.connection = connection;
        let connectionId = this.generateUuid();
        this.connections.set(connectionId, this.connection);
        let connectionAcknowledgement = {
            type: 'CONNECTION_SUCCESS',
            connectionId
        }
        this.sendMessageToClient(connectionAcknowledgement);

        // Listen to Client Messages
        connection.on('message', this.onMessageReceive);

        // On socket connection close
        connection.on('close', this.onConnectionClose);
    }

    onMessageReceive = (message) => {
       console.log(message)
    }

    onConnectionClose = (connection) => {
        let connectionsArray = [];
        let keysArray = [];
        connectionsArray = Array.from(this.connections.values());
        keysArray = Array.from(this.connections.keys());
        let index = connectionsArray.findIndex(connection => connection.remoteAddress === this.connection.remoteAddress);
        this.connections.delete(keysArray[index]);
        this.connection = null;
    }

    sendMessageToClient = (data) => {
        this.connection.send(JSON.stringify(data));
    }

    broadcastToClient = (data) => {
        Array.from(this.connections.values()).map(connection => {
              connection.send(JSON.stringify({
                  type: data.type || 'BROADCAST_EVENT',
                  data
              }));
        })
    }

    generateUuid = () => {
       return uuidv1({
           msec: Date.now()
       })
    }
}

module.exports = SocketService;