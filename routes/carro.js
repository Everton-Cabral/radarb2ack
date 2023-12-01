const router = require("express").Router()
const carroController = require("../controllers/carroController");
const upload = require('../middlewares/uploadMiddleware'); 




router
    .route("/carros")
    .post((req, res) => carroController.create(req, res));

router
    .route("/carros")
    .get((req, res) => carroController.getAll(req, res));

router
    .route("/carros/filtrado")
    .get((req, res) => carroController.getByFilter(req, res));

router
    .route("/carros/update")    
    .get((req, res) => carroController.getByElementId(req, res))
    
router
    .route("/carros")
    .delete((req, res) => carroController.delete(req, res));

router
    .route("/carros/:id")
    .put((req, res) => carroController.update(req, res));

router
    .route("/carros/upload/:id")
    .post(upload.single('file'), carroController.uploadFile)
    

module.exports = router;