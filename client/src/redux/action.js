import axios from "axios";

//------------------------------------------------------------
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";

export const ERROR = "ERROR";

export const GET_RECIPE_BY_NAME ="GET_RECIPE_BY_NAME";

export const GET_RECIPE_BY_ID ="GET_RECIPE_BY_ID";

export const GET_DIETS = "GET_DIETS";

export const FILTER_BY_DIETS = "FILTER_BY_DIETS";

export const ORDER_BY_HEALTH_SCORE = "ORDER_BY_HEALTH_SCORE";

export const ORDER_BY_NAME = "ORDER_BY_NAME";

export const POST_RECIPE = "POST_RECIPE";

export const RESTART = "RESTART";

//---------------------------------------------

export const FILTRO_BD = "FILTRO_BD";

export const DELETE_RECIPE = "DELETE_RECIPE";

//-----------------------------------------------------------

export const getAllRecipes = () =>{

    return function (dispatch){

        
            
        fetch("http://localhost:3001/recipes")
        .then( res => res.json())
        .then( data => dispatch ({

            type: GET_ALL_RECIPES,
            payload: data
        }))
        .catch(err => dispatch({

            type: ERROR,
            payload: err.message
        }))

        
    };
};

export const getRecipeByName = (name)=>{

    return async function(dispatch){

        try {
            
            const getRecipe = await axios.get("http://localhost:3001/recipes/?name=" + name);

            dispatch({

                type: GET_RECIPE_BY_NAME,
                payload: getRecipe.data,
                nombre: name
            });


        } catch (error) {
            
            dispatch({

                type: ERROR,
                payload: error.message
            });
        };
    };
};

export const getRecipeById = (id)=>{

    return async function(dispatch){

        try {
            
            const recipe = await axios.get("http://localhost:3001/recipes/" + id);

            dispatch({

                type: GET_RECIPE_BY_ID,
                payload: recipe.data
            })

        } catch (error) {
            
            dispatch({

                type: ERROR,
                payload: error.message
            })
        };
    };
};

export const getDiets = ()=>{

    return async function (dispatch){

        try {
            
            const diets = await axios.get("http://localhost:3001/diets");

            dispatch({

                type: GET_DIETS,
                payload: diets.data
            })

        } catch (error) {
            
            dispatch({

                type: ERROR,
                payload: error.message
            })
        };
    };
};

export const filterByDiets = (d)=>{

    return {

        type: FILTER_BY_DIETS,
        payload: d
    }
};

export const orderByHealthScore = (h) =>{

    return {
        type: ORDER_BY_HEALTH_SCORE,
        payload: h
    }
};

export const orderByName = (n) =>{

    return{
        type: ORDER_BY_NAME,
        payload: n
    }
};

export const postRecipe = (data) =>{

    console.log("dataaaaaaa",data)
    return async function (dispatch){

        try {
            
            const post = await axios.post("http://localhost:3001/recipes", data);

            dispatch({

                type: POST_RECIPE,
                payload: post.data
            });

        } catch (error) {
            
            dispatch({

                type: ERROR,
                payload: error.message
            });
        };
    };
};

export const restart = ()=>{

    return {
        
        type: RESTART
    }
}

//-------------------------------------------

export const filterBD = (info) => {

    return{

        type: FILTRO_BD,
        payload: info
    }
};

export const deleteRecipe = (id) => {

    return async function(dispatch){

        try {
            
            const recipeDelete = await axios.delete("http://localhost:3001/recipes/" + id);

            dispatch({

                type:DELETE_RECIPE,
                payload: recipeDelete.data
            })

        } catch (error) {
            
            dispatch({

                type: ERROR,
                payload: error.message
            })
        }
    }
};