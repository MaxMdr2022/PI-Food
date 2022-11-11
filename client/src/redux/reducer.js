import { GET_ALL_RECIPES, ERROR, GET_RECIPE_BY_NAME } from "./action";

const initialState = {

    recipes: [],

    allRecipes:[],

    error: ""
    
};



export default function rootReducer  (state= initialState, action){

    switch(action.type){

        case GET_ALL_RECIPES:

            return {

                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                error: ""
            }
        case ERROR:
            return{

                ...state,
                error: action.payload
            }    
        case GET_RECIPE_BY_NAME:
            return{

                ...state,
                recipes: action.payload,
                error:""

            }


        default:
            return{
                ...state
            }    

    };

};