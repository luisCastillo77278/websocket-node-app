const path = require('path');
const express = require('express');
const cors = require('cors');

const socketController = require('../sockets/controllers');

require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = require('http').createServer( this.app );
    this.io = require('socket.io')(this.server);

    this.paths = {};

    //middlewares
    this.middlewares();

    //routes
    this.routes();

    // sockets
    this.sockests();
  }

  middlewares() {

    const whitlist = ['http://localhost:3000'];
    
    this.app.use(cors({
      origin: whitlist
    }));

    this.app.use(express.static(path.join(__dirname, '../public')));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    //handling errors
    this.app.use((req, res) => {
      return res.status(404).json({ errors: '404 not found' });
    });
  }


  sockests(){
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () =>
      console.log(`Servidor corriendo en el puerto: ${this.port}`)
    );
  }
}

module.exports = Server;
