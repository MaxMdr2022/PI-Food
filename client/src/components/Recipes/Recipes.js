import React from "react";
import "../Recipes/Recipes.css"

const Recipes =({recipe})=> {

    return (
        <div className="recipes2">

            <div className="name">
                <p>{recipe.name}</p>
            </div>

            <div className="img">

                <img height="200" alt={recipe.name} src= {recipe.image ? recipe.image : "https://media.istockphoto.com/id/1161153224/photo/vintage-cookbook-with-spices-and-herbs-on-rustic-wooden-background.jpg?s=612x612&w=0&k=20&c=5IEYo7Ad-OetMkhjBUJtkrcsAKX606EHYKbhjiUHNQo="} />
            </div>
         

            <div className="puntaje">

                {recipe.healthScore > 40 ? <p className="saludable">healthScore: {recipe.healthScore}</p> : <p className="pocoSaludable">healthScore: {recipe.healthScore}</p> }
            </div>
            
            <div className="contenedorDiets">


                <div className="diets">

                    { recipe.diets.length > 0 ? recipe.diets.map(e => 

                        <p key={e}>{e}</p>

                    ): <p>No Diets</p>
                    }

                </div>
            </div>
           
        </div>
    )
};

export default Recipes;


