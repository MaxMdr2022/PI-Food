import React from "react";
import { getAllRecipes } from "../../redux/action";
import { useDispatch } from "react-redux";

const Recipe = ({recipe}) => {

    const dispatch = useDispatch();

    function handleHome (){

        dispatch(getAllRecipes());
    };

    return (
        <div>
            <img height="200" alt={recipe.name} src= {recipe.image ? recipe.image : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg"} />
            <p>{recipe.name}</p>
            <p>{recipe.dishTypes}</p>
            <p>{recipe.healthScore}</p>
            <p>{recipe.diets} </p>
            <p>{recipe.summary}</p>
            <p>{recipe.step}</p>
           
            <button onClick={()=> handleHome()}>Home</button>
        </div>
    )
};

export default Recipe;