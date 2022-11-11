import React from "react";


const Recipes =({recipe})=> {

    return (
        <div>

            <img height="200" alt={recipe.name} src= {recipe.image ? recipe.image : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg"} />

            <p>{recipe.name}</p>
            <p>{recipe.healthScore}</p>
            <p>{recipe.diets} </p>

            

        </div>
    )
};

export default Recipes;


//name={e.name} image={e.image} diets={e.diets} healthScore={e.healthScore}


//