const express = require('express')
const cors = require('cors')
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.userPath = '/api/user';
        this.middelwares();
        this.routes();
    }

    middelwares() {
        this.app.use(cors())

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("🚀 Servidor corriendo en el puerto", this.port)
        });
    }

}

module.exports = Server;
