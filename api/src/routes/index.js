const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRout = require("./recipesRoute");
const dietsRoute = require("./dietsRoute");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes",recipesRout);
router.use("/diets",dietsRoute);


module.exports = router;
