const mongoose = require("mongoose")

const { Schema } = mongoose;

const carroSchema = new Schema({
    placa: String,
    modelo: String,
    cliente: String,
    dataentrada: Date,
    situacao: String,
    orgao: String,
    obs: String,
    km: String,
},
    {timestamps: true}
);

const Carro = mongoose.model("Carro", carroSchema);

module.exports = {
    Carro,
    carroSchema,
};