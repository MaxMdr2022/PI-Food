import React from "react";
import "../Recipes/Recipes.css"

const Recipes =({recipe})=> {

    return (
        <div className="recipes2">

            <div className="name">
                <p>{recipe.name}</p>
            </div>

            <div className="img">

                <img height="200" alt={recipe.name} src= {recipe.image ? recipe.image : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg"} />
            </div>
         
            
            
            

            <div className="puntaje">

                <p>healthScore: {recipe.healthScore}</p>
            </div>
            
            <div className="contenedorDiets">


                <div className="diets">

                    { recipe.diets.length > 0 ? recipe.diets.map(e => 

                        <p key={e}>{e}</p>

                    ): null
                    }

                </div>
            </div>
           
            

            

        </div>
    )
};

export default Recipes;


