import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../NavBar/Navbar";
import "../Recipe/Recipe.css";
//--------------------------
import { deleteRecipe } from "../../redux/action";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

const Recipe = () => {

 
    const recipeId = useSelector(s => s.recipe);

    //-------------------------------------------------------------

    const dispatch = useDispatch()

    const handleDelete = (e) =>{

        dispatch(deleteRecipe(e))

    }

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

                            <img  alt={recipe.name} src= {recipe.image ? recipe.image : "https://media.istockphoto.com/id/1161153224/photo/vintage-cookbook-with-spices-and-herbs-on-rustic-wooden-background.jpg?s=612x612&w=0&k=20&c=5IEYo7Ad-OetMkhjBUJtkrcsAKX606EHYKbhjiUHNQo="} />
                        </div>
                        
                        <div className="grilla2">


                            <div className="name2">

                                <p>Recipe Name: {recipe.name}</p>
                            </div>
                            
                            <div className="grilla3">

                                <div className="dishType">
                                    <p>Dish Type</p>
                                    { recipe.dishTypes? <p> {recipe.dishTypes}</p> : <p>None</p>}
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
                    
                    
                    <div className="preparation">
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

                
                {/* boton delete y edit, hacer con un if. si e.createindb es true lo muestra sino no */}
                {
                    recipe.createInDB === true ? <button onClick={() => handleDelete(recipe.id)} >Delete</button> : null
                }
                {
                    recipe.createInDB === true ? <div> <Link to={"/put"}> <button  >PUT</button></Link> </div>: null
                }

            </div>

            ) : <div className="loading"><p>Loading...</p></div>}

        </div>
    )
};

export default Recipe;


