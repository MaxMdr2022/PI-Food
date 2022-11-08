const checkData = (req, res, next)=> {

    const {name, summary, healthScore, step, diet} = req.body;

    // if(!name){
        
    //     res.status(400).send("falta name");
    // }else{
    //     typeof name == Number(name)? res.status(400).send("name debe ser un string") : null;
    // }
    if(!summary) return res.status(400).send("falta name");
    if(!healthScore) return res.status(400).send("falta name");
    if(!step) return res.status(400).send("falta name");
    if(!diet) return res.status(400).send("falta name");

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