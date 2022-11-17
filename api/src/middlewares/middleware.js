const checkData = (req, res, next)=> {

    const {name, summary, healthScore, step, image, diets} = req.body;

    if(!name){
        
       return res.status(400).send("Debe ingresar un name");

    }else{

        if( typeof name != "string"){

           return  res.status(400).send("name debe ser un string");
        };
       
    };

    if(!summary) return res.status(400).send("Debe ingresar un summary");

    if(!healthScore){

       return res.status(400).send("Debe ingresar el healthScore");

    }else{

        if( healthScore != Number(healthScore)){
            
            return res.status(400).send("healthScore debe ser un numero");
        };
    };

    if(!step) return res.status(400).send("Debe ingresar los pasos");

    //if(!image) return res.status(400).send("Debe ingresar una imagen");

    if(!diets) return res.status(400).send("falta seleccionar dieta");

    // console.log("name", name)
    // console.log("summary", summary)
    // console.log("healt", healthScore)
    // console.log("step", step)
    // console.log("diet", diet)

    next();
};

module.exports = {

    checkData,
};


/*
Status code 200: OK
Status code 201: Created
Status code 202: Accepted
Status code 203: Non-Authoritative Information
Status code 204: No content     DELETE
Status code 205: Reset Content
Status code 206: Partial Content
Status code 207: Multi Status
Status code 208: Multi Estado

Códigos de estado que indican un error
Códigos de estado 400: mala peticion 
Códigos de estado 403 / 404:  página que hemos intentado cargar no ha sido localizada
Códigos de estado 500: un error interno del código de la página

*/ 