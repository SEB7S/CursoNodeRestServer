const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.rolePath = '/api/role';
        this.authPath = '/api/auth';

        this.connectDB();
        this.middelwares();
        this.routes();
    }

    async connectDB() {
        await dbConection();
    }

    middelwares() {
        this.app.use(cors())

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.rolePath, require('../routes/role'));
        this.app.use(this.authPath, require('../routes/auth'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;
