const axios = require("axios");
const {Diet} = require("../db");

require('dotenv').config();
const { API_KEY }= process.env;

const getDietsApiToDB = async () =>{

    try {

        const dietsBD = await Diet.findAll();

        // console.log(dietsBD);

        if(!dietsBD.length){

           const infoApi = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"); // API PIRATA
            //  const infoApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

            const dietsApi = infoApi.data.results.map((e) =>{
                
                return e.vegetarian? e.diets.map(e => e).concat("vegetarian") : e.diets.map(e => e)
            
            });

            const filterDiets = new Set(dietsApi.flat());

            let arrDiets = [...filterDiets];

            let mapDiets = arrDiets.map(e => {return {name: e}})

            mapDiets.forEach(async(e) => {

                await Diet.create(e)
            });
        };    
        

    } catch (error) {
        
        console.log(error)
    }
};

module.exports = getDietsApiToDB;