import React from "react";
// import { getAllRecipes } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const Recipe = () => {

    // const dispatch = useDispatch();
    const recipeId = useSelector(s => s.recipe);

    // function handleHome (){

    //     dispatch(getAllRecipes());
    // };

    return (
        <div>
            { recipeId.map(recipe => 

            <div>
                <img height="200" alt={recipe.name} src= {recipe.image ? recipe.image : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg"} />
                <p>{recipe.name}</p>
                <p>{recipe.dishTypes}</p>
                <p>{recipe.healthScore}</p>

                { recipe.diets.length > 0 ? recipe.diets.map(e => 

                    <p>{e}</p>

                ): null

                }
                
                <p>{recipe.summary}</p>

                { recipe.step.length > 0 ? recipe.step.map((e, i) =>
                
                    <div>
                        <p>Step {i +1}:</p>
                        <p>{e}</p>
                    </div>
                
                ) : null
                }

            </div>
            ) }


            {/* <button onClick={()=> handleHome()}>Home</button> */}
        </div>
    )
};

export default Recipe;