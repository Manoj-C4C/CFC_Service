const WebSocketServer = require('websocket').server;

class SocketService {
    static socketServiceInstance;
    static connection;
    static connections = new Map();
    constructor() { }

    static createWebSocketServer = (config) => {
        SocketService.socketServiceInstance = new SocketService(config);
        const ws = new WebSocketServer(config.options)
        ws.on('request', SocketService.socketServiceInstance.onConnectionRequest)
    }

    onConnectionRequest = (request) => {
        const connection = request.accept(null, request.origin);
        SocketService.connection = connection;
        // Listen to Client Messages
        connection.on('message', SocketService.socketServiceInstance.onMessageReceive);
        // On socket connection close
        connection.on('close', SocketService.socketServiceInstance.onConnectionClose);
    }

    onMessageReceive = (message) => {
        const data = JSON.parse(message.utf8Data);
        if (data.userId) {
            this.setUserConnection(data.userId);
        } else {
            console.log(data);
        }
    }

    setUserConnection = (userId) => {
        let connectionId = userId;
        SocketService.connections.set(connectionId, SocketService.connection);
        let connectionAcknowledgement = {
            type: 'CONNECTION_SUCCESS',
            connectionId
        }
        SocketService.sendMessageToClient(userId, connectionAcknowledgement);
    }

    onConnectionClose = () => {
        let connectionsArray = [];
        let keysArray = [];
        connectionsArray = Array.from(SocketService.connections.values());
        keysArray = Array.from(SocketService.connections.keys());
        let index = connectionsArray.findIndex(connection => connection.remoteAddress === SocketService.connection.remoteAddress);
        SocketService.connections.delete(keysArray[index]);
    }

    static sendMessageToClient = (userId, data) => {
        let socketConnection = SocketService.connections.get(userId);
        if (socketConnection) {
            console.log(data);
            socketConnection.send(JSON.stringify(data));
        }
    }

    static broadcastToClient = (data) => {
        Array.from(SocketService.connections.values()).map(connection => {
            connection.send(JSON.stringify({
                type: data.type || 'BROADCAST_EVENT',
                data
            }));
        })
    }

}

module.exports = SocketService;