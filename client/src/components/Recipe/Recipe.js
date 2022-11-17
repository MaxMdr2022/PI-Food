import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../NavBar/Navbar";



const Recipe = () => {

 
    const recipeId = useSelector(s => s.recipe);


    return (
        <div>
            <div >
                <Navbar/>

            </div>

            {recipeId.length > 0 ? recipeId.map(recipe => 

            <div key={recipe.id}>

                <img height="200" alt={recipe.name} src= {recipe.image ? recipe.image : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg"} />
                <p>{recipe.name}</p>
                <p>{recipe.dishTypes}</p>
                <p>{recipe.healthScore}</p>

                { recipe.diets.length > 0 ? recipe.diets.map(e => 

                    <p key={e}>{e}</p>

                ): null

                }
                
                <p >{recipe.summary.replace(/<[^>]*>?/g, '')}</p>

                { recipe.step.length > 0 ? recipe.step.map((e, i) =>
                
                    <div key={i}>

                        <p>Step {i +1}:</p>
                        <p>{e}</p>

                    </div>
                
                ) : null
                }

            </div>
            ) : <h1>cargando..</h1>}

        </div>
    )
};

export default Recipe;