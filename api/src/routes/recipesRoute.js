const {Router} = require("express");
const axios = require("axios");
const {getRecipesApi,getRecipeByName, getRecipeById, createRecipeDB} = require("../controllers/controllers");
const {Recipe, Diet} = require("../db");
const {checkData} = require("../middlewares/middleware");


const route = Router();

route.get("/", async(req,res)=>{

    try {
        
        const {name} = req.query;
        
        const allRecipes = await getRecipesApi();

        if(name){ //http://localhost:3001/recipes/?name=mila

            const recipeNmae = await getRecipeByName(name);

            return recipeNmae.length ? res.status(200).json(recipeNmae) : res.status(400).send("No hay receta con ese nombre");
        };
    
        res.status(200).json(allRecipes);

    } catch (error) {
        
        res.status(500).send(error.message);
    }
});

route.get("/:id", async (req,res)=> {

    try {                       //http://localhost:3001/recipes/12
        
        const {id} = req.params;

        const recipeId = await getRecipeById(id);

        typeof recipeId == "string"? res.status(404).send(recipeId) : res.status(200).json(recipeId);

    } catch (error) {
      
        res.status(500).send(error.message);
    };
});

route.post("/", checkData, async (req,res) =>{


    try {

        await createRecipeDB(req.body);

        res.status(201).send("receta creada");


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


/* POST
{
  "name":"mila",
  "summary":"plato argentino ..",
  "healthScore":2,
  "step":["empanado", "horno", "comer"],
  "image":"image.jpg",
  "diet":["vegan","primal","vegetarian"]
}

*/ 