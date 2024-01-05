const mongoose = require("mongoose");
const grid = require("gridfs-stream");
const fs = require("fs");
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function main() {
    try {
        // Substitua "radar" pelo nome do seu banco de dados local
        const databaseName = "radar2";

        // Substitua a string de conexão para apontar para o banco de dados local
        await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Conectado ao banco!");

    // Crie uma stream do GridFS usando o Mongoose e o GridFS-Stream
        const connection = mongoose.connection;
        grid.mongo = mongoose.mongo;
        const gfs = grid(connection.db);




    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;
