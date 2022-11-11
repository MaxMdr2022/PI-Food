import axios from "axios";

//------------------------------------------------------------
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";

export const ERROR = "ERROR";

export const GET_RECIPE_BY_NAME ="GET_RECIPE_BY_NAME";

//-----------------------------------------------------------

export const getAllRecipes = () =>{

    return async function (dispatch){

        try {
            
            const axiosRespuesta = await axios.get("http://localhost:3001/recipes");

            const recipes = axiosRespuesta.data;

            dispatch({

                type: GET_ALL_RECIPES,
                payload: recipes
            })

        } catch (error) {
            
            dispatch({

                type: ERROR,
                payload: error.message
            })
        };
    };
};

export const getRecipeByName = (name)=>{

    return async function(dispatch){

        try {
            
            const getRecipe = await axios.get("http://localhost:3001/recipes/?name=" + name);

            dispatch({

                type: GET_RECIPE_BY_NAME,
                payload: getRecipe.data
            });


        } catch (error) {
            
            dispatch({

                type: ERROR,
                payload: error.message
            });
        };
    };
};

