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

                    const response = await CarroModel.create(carro);
        
                    res.status(201).json({response, msg: "serviço criado com sucesso!"})
              

        } catch (error) {

            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const carros = await CarroModel.find().sort({ dataentrada: -1 });

            res.json(carros); 

        } catch (error) {
            console.log(error)
        }
    },
    getCarOficina: async(req, res) =>{
        try {
           

            const carrosNaOficina = await CarroModel.find({ naoficina: true });

            res.json(carrosNaOficina );

        } catch(error){
            console.log(error)
        }
    }, 
    getOrcamento: async(req, res) =>{
        try {
           
            const orcamento = await CarroModel.find({ fezorcamento: false }).sort({ dataentrada: 1 });

            res.json(orcamento );

        } catch(error){
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
    checkOrcamento: async (req, res) => {
        const id = req.params.id;

        const checkOrcamento = await CarroModel.findByIdAndUpdate(id, {fezorcamento: true})

        if (!checkOrcamento) {
            res.status(404).json({msg: "Serviço não encontrado."});
            return;
        }

        res.status(200).json({msg:"Serviço atualizado com sucesso!"})
    },
    exitCar: async (req, res) => {
        const id = req.params.id;
        const dataAtual = new Date();

        const exitCarro = await CarroModel.findByIdAndUpdate(id, {naoficina: false, datasaida: dataAtual})

        if (!exitCarro) {
            res.status(404).json({msg: "Serviço não encontrado."});
            return;
        }

        res.status(200).json({msg:"Serviço atualizado com sucesso!"})
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
            orcamento: req.body.orcamento,
            imagens: req.body.imagens,
            videos: req.body.videos,
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
          } else{
            console.log('arquivo enviado')
          }
          console.log(id)
      
          // Obtenha o conteúdo do arquivo como Buffer
          const fileContent = file.buffer;
      
          const params = {
            Bucket: 'filesradar',
            Key: `uploads/${id}/${file.originalname}`,
            Body: fileContent,
            ContentType: file.mimetype,
            ContentDisposition: 'inline',
          };
      
          // Utiliza o SDK da AWS configurado globalmente
          const uploadResponse =  await req.app.get('s3').upload(params).promise();
          //console.log('Resposta completa do upload:', uploadResponse.Location);

          const tipoArquivo = file.mimetype.split('/')[0];
        if(tipoArquivo === 'image'){
            const carroAtualizado = await CarroModel.findByIdAndUpdate(id, { $push: { imagens: uploadResponse.Location } }, { new: true });
           res.status(200).json({ message: 'Upload bem-sucedido!', imagens: carroAtualizado.imagens });
        } else if(tipoArquivo === 'video'){
            const carroAtualizado = await CarroModel.findByIdAndUpdate(id, { $push: { videos: uploadResponse.Location } }, { new: true });
           res.status(200).json({ message: 'Upload bem-sucedido!', videos: carroAtualizado.videos});
        }
          
          
         
        } catch (error) {
          console.error('Erro durante o upload para o S3:', error);
          return res.status(500).json({ message: 'Erro durante o upload para o S3', error: error.message });
        }
      }

    
};

module.exports = carroController;