import React from "react";


const Recipes =({recipe})=> {

    return (
        <div>

            <img height="200" alt={recipe.name} src= {recipe.image ? recipe.image : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg"} />

            <p>{recipe.name}</p>
            <p>{recipe.healthScore}</p>
            
            { recipe.diets.length > 0 ? recipe.diets.map(e => 

                <p>{e}</p>

            ): null
            }

            

        </div>
    )
};

export default Recipes;


//name={e.name} image={e.image} diets={e.diets} healthScore={e.healthScore}


//