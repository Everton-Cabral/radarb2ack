const mongoose = require("mongoose")

const { Schema } = mongoose;

const carroSchema = new Schema({
    placa: String,
    modelo: String,
    cliente: String,
    dataentrada: Date,
    datasaida: Date,
    situacao: String,
    orgao: String,
    obs: String,
    orcamento: String,
    km: String,
    naoficina: {
        type: Boolean,
        default: true
    },
    fezorcamento: {
        type: Boolean,
        default: false
    },
    imagens: [String],
    videos: [String],
},
    {timestamps: true}
);

const Carro = mongoose.model("Carro", carroSchema);

module.exports = {
    Carro,
    carroSchema,
};