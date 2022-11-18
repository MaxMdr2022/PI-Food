import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../NavBar/Navbar";
import "../Recipe/Recipe.css";



const Recipe = () => {

 
    const recipeId = useSelector(s => s.recipe);


    return (
        <div >

            <div className="nav" >
                <Navbar/>

            </div>

            {recipeId.length > 0 ? recipeId.map(recipe => 

            <div className="recipe" key={recipe.id}>

                <div className="recipe2">

                    <div className="grilla">


                        <div className="contenedorImagen">

                            <img height="200" alt={recipe.name} src= {recipe.image ? recipe.image : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg"} />
                        </div>
                        
                        <div className="grilla2">


                            <div>

                                <p>Recipe Name: {recipe.name}</p>
                            </div>
                            
                            <div>

                                <div>

                                    { recipe.dishTypes? <p>Dish Type: {recipe.dishTypes}</p> : null}
                                </div>

                                <div>

                                    <p>Healt Score:{recipe.healthScore}</p>
                                </div>
                                
                            </div>
                            

                            
                        </div>
                        
                    </div>


                    <div>

                        <p>Diets:</p>
                            { recipe.diets.length > 0 ? recipe.diets.map(e => 

                                <p key={e}>{e}</p>

                           ): null

                          }
                    </div>

                    <div>
                        <p >Summary: {recipe.summary.replace(/<[^>]*>?/g, '')}</p>

                    </div>
                    
                    
                    <div>
                        <p>Preparation: </p>
                            { recipe.step.length > 0 ? recipe.step.map((e, i) =>
                                        
                            <div key={i}>

                                <p>Step {i +1}:</p>
                                <p>{e}</p>

                            </div>
                                        
                        ) : null
                        }

                    </div>
                </div>

                
                

                

            </div>

            ) : <h1>cargando..</h1>}

        </div>
    )
};

export default Recipe;