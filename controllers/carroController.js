const { Carro: CarroModel} = require("../models/carro");
const AWS = require('aws-sdk')
const upload = require('../middlewares/uploadMiddleware'); 
const path = require('path');

const carroController = {

    create: async(req, res) => {
        try {

            const carro = {
                placa: req.body.placa,
                modelo: req.body.modelo,
                cliente: req.body.cliente,
                dataentrada: req.body.dataentrada,
                situacao: req.body.situacao,
                orgao: req.body.orgao,
                obs: req.body.obs,
                km: req.body.km,
            };

            const placaExistente = await CarroModel.find({placa: carro.placa});
                if(placaExistente.length === 0){
                    const response = await CarroModel.create(carro);
        
                    res.status(201).json({response, msg: "serviço criado com sucesso!"})
                } else {
                    res.json({msg:"placa cadastrada"})
                }

        } catch (error) {

            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const carros = await CarroModel.find();

            res.json(carros); 

        } catch (error) {
            console.log(error)
        }
    },
    getByFilter: async(req, res) =>{
        try {
            const { placa, modelo, cliente, dataentrada, situacao, orgao, km} = req.query
            const filtro = {}

            if (placa) filtro.placa = placa;
            if (modelo) filtro.modelo = modelo;
            if (cliente) filtro.cliente = cliente;
            if (dataentrada) filtro.dataentrada = dataentrada;
            if (situacao) filtro.situacao = situacao;
            if (orgao) filtro.orgao = orgao;
            if (km) filtro.km = km;

            const carrosFiltrados = await CarroModel.find(filtro);

            res.json(carrosFiltrados);

        } catch(error){
            console.log(error)
        }
    }, 
    getByElementId: async(req, res) =>{
        try{
            const id = req.query.id
            const carro = await CarroModel.findById(id)
            res.json(carro)

        } catch(error){
            console.log(error)
        }
    },
    delete: async(req, res) => {
        try {

            const id = req.query.id
          

            const carro = await CarroModel.findById(id);

            if (!carro) {
                res.status(404).json({ msg: "serviço não encontrado."})
                return;
            }

            const deletedCarro = await CarroModel.findByIdAndDelete(id)

            res.status(200).json({deletedCarro, msg: "Serviço excluido com sucesso"})

        } catch (error) {
            console.log(error)
            
        }
    },
    update: async (req, res) => {
        const id = req.params.id;

        const carro = {
            placa: req.body.placa,
            modelo: req.body.modelo,
            cliente: req.body.cliente,
            dataentrada: req.body.dataentrada,
            situacao: req.body.situacao,
            orgao: req.body.orgao,
            obs: req.body.obs,
            km: req.body.km,
        };

        const updateCarro = await CarroModel.findByIdAndUpdate(id, carro)

        if (!updateCarro) {
            res.status(404).json({msg: "Serviço não encontrado."});
            return;
        }

        res.status(200).json({carro, msg:"Serviço atualizado com sucesso!"})
    },

    uploadFile: async (req, res) => {
        try {
          const { id } = req.params;
          const { file } = req;
      
          if (!file) {
            return res.status(400).send('Nenhum arquivo enviado');
          }
      
          // Obtenha o conteúdo do arquivo como Buffer
          const fileContent = file.buffer;
      
          const params = {
            Bucket: 'filesradar',
            Key: `uploads/${id}/${file.originalname}`,
            Body: fileContent,
          };
      
          // Utiliza o SDK da AWS configurado globalmente
          await req.app.get('s3').upload(params).promise();
      
          return res.status(200).json({ message: 'Upload bem-sucedido!' });
        } catch (error) {
          console.error('Erro durante o upload para o S3:', error);
          console.log('Resposta do servidor:', await error.text());
          return res.status(500).json({ message: 'Erro durante o upload para o S3', error: error.message });
        }
      }

    
};

module.exports = carroController;