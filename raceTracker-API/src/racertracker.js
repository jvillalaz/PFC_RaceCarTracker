import express from 'express'
import cors from 'cors'
import http from 'http'
import socketio from 'socket.io'
import routes from './routes'

import registerLap from './websocket_functions'

import './database'

class RacerTrack {
    constructor(){
        this.server = express();
        this.http_server = http.createServer(this.server);
        this.socket_server = socketio(this.http_server);

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(express.urlencoded({extended: true}));
    }

    routes(){
        this.server.use(routes);
    }

    socketio_configure(){
        this.socket_server.on('connection', socket => {
            socket.emit('onConnection', 'Socket connected')
            socket.on('registerLap', message => {
                console.log(`registering lap`)
                registerLap(message, resultMessage => {
                    this.socket_server.emit('message', resultMessage)
                    this.socket_server.emit('toWebsite', message)
                })
            })
        })
    }
}

export default new RacerTrack().http_server;
