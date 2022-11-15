import { GET_ALL_RECIPES, ERROR, GET_RECIPE_BY_NAME, GET_RECIPE_BY_ID,GET_DIETS, FILTER_BY_DIETS, ORDER_BY_HEALTH_SCORE, ORDER_BY_NAME, POST_RECIPE, RESTART } from "./action";

const initialState = {

    recipes: [],

    allRecipes:[],

    error: "",

    recipe: [],

    diets: [],

    recipeByName: [],

    recipeDiets: [],
    
    post: []
};



export default function rootReducer  (state= initialState, action){

    switch(action.type){

        case GET_ALL_RECIPES:

            return {

                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                error: "",
                recipeByName:[],
                recipeDiets:[],
                // recipe: []
            }
        case ERROR:
            return{

                ...state,
                error: action.payload,
                recipes:[]
            }    
        
        case GET_RECIPE_BY_ID:
            return{

                ...state,
                recipe: action.payload,
                error: "",
                // recipes: []
            }
        case GET_DIETS:
            return{

                ...state,
                diets: action.payload
            }    
        case FILTER_BY_DIETS:
            
                const allRecipes = state.allRecipes;
                const recipeName = state.recipeByName;
                
                let recipeFilterDiets = [];
                let dietfilter =[];

                dietfilter= action.payload === "Todo" ? allRecipes : allRecipes.filter(e => e.diets.find(e => e === action.payload ));

                !recipeName.length > 0 ?
                   recipeFilterDiets  = action.payload === "Todo" ? allRecipes : allRecipes.filter(e => e.diets.find(e => e === action.payload )  ) :
                   recipeFilterDiets  = action.payload === "Todo" ? recipeName : recipeName.filter(e => e.diets.find(e => e === action.payload )  )

                const err = !recipeFilterDiets.length > 0 ? "error1" : ""; 
            return{

                ...state, 
                recipes: recipeFilterDiets,
                error: err,
                recipeDiets: dietfilter,
                // d: dd
            } 
        case GET_RECIPE_BY_NAME:

                const recipesName= action.payload;
                const recdietas= state.recipeDiets;  //recipeDiets
                const nombre = action.nombre; // ponerle nombre a param
                
    
                
                let r = []
                let r2 = ""
    
                if(recdietas.length > 0){
    
                    r =  recdietas.filter(e => e.name.toLowerCase().includes(nombre.toLowerCase()))

                    if(!r.length > 0){
                        r2 = "error2"
                    }
                }else {
    
                    r = recipesName
                }
                
                
            return{
    
                ...state,
                recipes: r,
                error: r2,
                recipeByName: action.payload,
                // diets: []
    
            }
        case ORDER_BY_HEALTH_SCORE:
            
            const value = action.payload;
            const recip = state.recipes;

            let f =[];
            let e = "";
            //                            a  b
            if(recip.length > 0){ // [2, 12, 1, 10]  | si retorna -1 [a, b], si retorna 1 [b, a]. 0 no hay cambios. 

                f = value === "high health score" ? recip.sort(function(a,b){

                    if(a.healthScore > b.healthScore) return -1;

                    if(b.healthScore > a.healthScore) return 1;

                    return 0;
                }) :
                recip.sort(function (a, b){
                    
                    if(a.healthScore > b.healthScore) return 1;

                    if(b.healthScore > a.healthScore) return -1;

                    return 0;
                    
                });

            }else{

                e = "error3";
            };
            

            return{

                ...state,
                recipes: f,
                error: e

            }
        case ORDER_BY_NAME:

            const rec = state.recipes;
            const n = action.payload;

            let arr= [];
            let er = "";

            if(rec.length >0){

                arr = n === "A-Z" ? rec.sort(function(a,b){

                    if(a.name > b.name) return 1;
                    if(b.name > a.name) return -1;
                    return 0;
                
                }) : rec.sort(function (a,b){

                    if(a.name > b.name) return -1;
                    if(b.name > a.name) return 1;

                    return 0;
                });
            
            }else{

                er = "error4";
            };

            return{

                ...state,
                recipes: arr,
                error: er
            }

        case POST_RECIPE:
            
            return{

                ...state,
                post: action.payload,
                // recipes: [...state.recipes, action.payload ]
            }
        case RESTART:
            return{

                ...state,
                recipes: [],
                recipe:[],
                error: ""
            }    
        default:
            return{
                ...state
            }    

    };

};


/*
if(param.toLowerCase() === recdietas.find(e => e.name.toLowerCase().includes(param.toLowerCase()))){
    
                    return r =  recdietas.filter(e => e.name.toLowerCase().includes(param.toLowerCase())) 
                    }else{
                        r2 = "error2"
                    }

*/