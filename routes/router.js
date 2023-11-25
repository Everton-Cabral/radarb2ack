const router = require("express").Router()

// Carro router
const carroRouter = require("./carro")

router.use("/", carroRouter);

module.exports = router;