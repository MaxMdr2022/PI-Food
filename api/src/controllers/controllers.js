const axios = require("axios");
const{Diet, Recipe} = require("../db");


const getDietsApi = async ()=>{

    const infoApi = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"); // API PIRATA
    //const api = await axios.get("https://api.spoonacular.com/recipes/complexSearch/?apiKey=bcf02685b24e4b29a42f183b3ea38e72&addRecipeInformation=true&number=100");

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
    
    // const getApi = await axios.get("https://api.spoonacular.com/recipes/complexSearch/?apiKey=bcf02685b24e4b29a42f183b3ea38e72&addRecipeInformation=true&number=100");

    const recipesApi = getApi.data.results.map(e=> {

        return {

            id: e.id,
            name: e.title,
            healthSccore: e.healthScore,
            summary: e.summary,
            dishTypes: e.dishTypes.map(e => e),
            step: e.analyzedInstructions[0]? e.analyzedInstructions[0].steps.map(e => e.step) : ["no hay pasos"],
            diets: e.vegetarian? e.diets.map(e => e).concat("vegetarian") : e.diets.map(e => e)
        }
    });

    return recipesApi;
};

const getRecipeByName = async(name) =>{  // en el fron en la action http:localhost:3001/recipes/?name=${name}

    const allRecipes = await getRecipesApi();

    const allRecipesfilter = allRecipes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));

    return allRecipesfilter;
};

const getRecipeById = async (id) => {

    const allRecipes = await getRecipesApi();

    const allRecipesfilter = allRecipes.filter(e => e.id == Number(id));

    return allRecipesfilter;
};

const createRecipeDB = async (req) =>{

    const {name, summary, healthScore, step, diet} = req;

    const recipeDB = await Recipe.create({

        name: name,
        summary: summary,
        healthScore: healthScore,
        step: step
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