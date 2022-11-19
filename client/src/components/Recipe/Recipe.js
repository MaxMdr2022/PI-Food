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

                            <img  alt={recipe.name} src= {recipe.image ? recipe.image : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg"} />
                        </div>
                        
                        <div className="grilla2">


                            <div className="name2">

                                <p>Recipe Name: {recipe.name}</p>
                            </div>
                            
                            <div className="grilla3">

                                <div className="dishType">
                                    <p>Dish Type</p>
                                    { recipe.dishTypes? <p> {recipe.dishTypes}</p> : null}
                                </div>

                                <div className="healtScore">
                                    <p>Healt Score</p>
                                    <p>{recipe.healthScore}</p>
                                </div>

                            </div>
                            

                            
                        </div>
                        
                    </div>


                    <div className="diet">

                        <p>Diets</p>

                        <div className="diets2">

                            { recipe.diets.length > 0 ? recipe.diets.map(e => 

                              <p key={e}>{e}</p>

                            ): null

                            }
                        </div>
                            
                    </div>

                    <div className="summary">
                        <p>Summary</p>
                        <p className="summary2"> {recipe.summary.replace(/<[^>]*>?/g, '')}</p>

                    </div>
                    
                    
                    <div>
                        <p>Preparation: </p>
                            { recipe.step.length > 0 ? recipe.step.map((e, i) =>
                                        
                            <div key={i}>

                                <p className="pStep">Step {i +1}:</p>
                                <p className="pStep2">{e}</p>

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