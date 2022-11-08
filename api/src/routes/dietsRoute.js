const {Router} = require("express");
const axios = require("axios");
const {Diet} = require("../db");
const { getDietsApi } = require("../controllers/controllers");


const route = Router();


route.get("/",async (req,res)=>{

    try {
    
        const dietsAPI = await getDietsApi();

        res.status(200).send("Get Diets");

    } catch (error) {
        
        res.status(500).send(error.message);
    }
});

module.exports = route;



/*
Status code 200: OK
Status code 201: Created
Status code 202: Accepted
Status code 203: Non-Authoritative Information
Status code 204: No content
Status code 205: Reset Content
Status code 206: Partial Content
Status code 207: Multi Status
Status code 208: Multi Estado

Códigos de estado que indican un error
Códigos de estado 403 / 404:  página que hemos intentado cargar no ha sido localizada
Códigos de estado 500: un error interno del código de la página

*/ 