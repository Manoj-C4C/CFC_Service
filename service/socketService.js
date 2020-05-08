const WebSocketServer = require('websocket').server;
const {v1: uuidv1} = require('uuid');

class SocketService {
    static socketServiceInstance;
    static connection;
    static connections = new Map();
    constructor() {}

    static createWebSocketServer = (config) => {
        SocketService.socketServiceInstance = new SocketService(config); 
        const ws = new WebSocketServer(config.options)
        ws.on('request', SocketService.socketServiceInstance.onConnectionRequest)
    }

    onConnectionRequest = (request) => {
        const connection = request.accept(null, request.origin);
        SocketService.connection = connection;
        let connectionId = this.generateUuid();
        SocketService.connections.set(connectionId, SocketService.connection);
        let connectionAcknowledgement = {
            type: 'CONNECTION_SUCCESS',
            connectionId
        }
        SocketService.sendMessageToClient(connectionAcknowledgement);

        // Listen to Client Messages
        connection.on('message', SocketService.socketServiceInstance.onMessageReceive);

        // On socket connection close
        connection.on('close', SocketService.socketServiceInstance.onConnectionClose);
    }

    onMessageReceive = (message) => {
       console.log(message)
    }

    onConnectionClose = () => {
        let connectionsArray = [];
        let keysArray = [];
        connectionsArray = Array.from(SocketService.connections.values());
        keysArray = Array.from(SocketService.connections.keys());
        let index = connectionsArray.findIndex(connection => connection.remoteAddress === SocketService.connection.remoteAddress);
        SocketService.connections.delete(keysArray[index]);
        SocketService.connection = null;
    }

    static sendMessageToClient = (data) => {
        console.log(JSON.stringify(data));
        SocketService.connection.send(JSON.stringify(data));
    }

    static broadcastToClient = (data) => {
        Array.from(SocketService.connections.values()).map(connection => {
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