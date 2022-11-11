const axios = require("axios");
const{Diet, Recipe} = require("../db");
require('dotenv').config();
const {API_KEY} = process.env;


const getDietsApi = async ()=>{

    
    const infoApi = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"); // API PIRATA
    // const infoApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    const dietsApi = infoApi.data.results.map((e) =>{
                
        return e.vegetarian? e.diets.map(e => e).concat("vegetarian") : e.diets.map(e => e)
            
    });

    const filterDiets = new Set(dietsApi.flat());

    let arrDiets = [...filterDiets];

    let mapDiets = arrDiets.map(e => {return {name: e}})

    return mapDiets;
};

const getRecipesApi = async () =>{

    const getApi = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5/information&number=100");  // API PIRATA
    
    // const getApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`); //API OFICIAL

    const recipesApi = getApi.data.results.map(e=> {

        return {

            id: e.id,
            name: e.title,
            image: e.image,
            healthScore: e.healthScore,
            summary: e.summary,
            dishTypes: e.dishTypes.map(e => e),
            step: e.analyzedInstructions[0]? e.analyzedInstructions[0].steps.map(e => e.step) : ["no hay pasos"],
            diets: e.vegetarian? e.diets.map(e => e).concat("vegetarian") : e.diets.map(e => e)
        }
    });

    const recipeBD = await Recipe.findAll({

        include:{

            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });

    const recipeBD2 = recipeBD.map( e => {

        return {
            id: e.id,
            name: e.name,
            summary: e.summary,
            healthScore: e.healthScore,
            step: e.step,
            image: e.image,
            createInDB: e.createInDB,
            diets: e.diets.map( e=> e.name)
        }
    });


    const allRecipes = [...recipeBD2, ...recipesApi];

    return allRecipes;
};

const getRecipeByName = async(name) =>{  // en el fron en la action http:localhost:3001/recipes/?name=${name}

    const allRecipes = await getRecipesApi();

    const allRecipesfilter = allRecipes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));

    return allRecipesfilter;
};

const getRecipeById = async (id) => { 

    const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/  // verificacion para UUID

    if(regex.test(id)){

        const recipeIdBD = await Recipe.findByPk(id);

        if(recipeIdBD){

            const recipeBD = await Recipe.findAll({

                where:{id: id},
                include:{
    
                    model: Diet,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            });

            return recipeBD;
        };

        return "No hay recipe en BD con ese id";
    };
    
    //  console.log("appii.......",typeof id) // el id llega como string

     
    const getApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);

    
    const getApiArr= [getApi]; // getApi es un objeto y no lo puedo mapear, por eso lo meto en un arreglo.

    // console.log("arr", getApiArr);
    const recipesApi = getApiArr.map(e=> {

        return {

            id: e.data.id,
            name: e.data.title,
            image: e.data.image,
            healthScore: e.data.healthScore,
            summary: e.data.summary,
            dishTypes: e.data.dishTypes.map(e => e),
            step: e.data.analyzedInstructions[0]? e.data.analyzedInstructions[0].steps.map(e => e.step) : ["no hay pasos"],
            diets: e.data.vegetarian? e.data.diets.map(e => e).concat("vegetarian") : e.data.diets.map(e => e)
        }
    });

    return recipesApi;
                
};

const createRecipeDB = async (req) =>{

    const {name, summary, healthScore, step, image, diet} = req;

    const recipeDB = await Recipe.create({

        name: name,
        summary: summary,
        healthScore: healthScore,
        step: step,
        image: image
    });

    const dietBD = await Diet.findAll({

        where: { name: diet }
    });

    recipeDB.addDiets(dietBD);
};

module.exports ={
    getDietsApi,
    getRecipesApi,
    getRecipeByName,
    getRecipeById,
    createRecipeDB,
};



/*

j: bcf02685b24e4b29a42f183b3ea38e72
d: 9844f2ecb2b54419b4849beefb4f2a51
*/ 