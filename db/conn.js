const mongoose = require("mongoose");

async function main() {
    try {
        // Substitua "radar" pelo nome do seu banco de dados local
        const databaseName = "radar";

        // Substitua a string de conexão para apontar para o banco de dados local
        await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Conectado ao banco!");
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;
