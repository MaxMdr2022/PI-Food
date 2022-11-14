import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/action";
import Recipes from "../Recipes/Recipes";
import Pagination from "../Pagination/Pagination";
import Searchbar from "../Searchbar/Searchbar";
import { getRecipeById, getDiets, filterByDiets, orderByHealthScore, orderByName } from "../../redux/action";
import Recipe from "../Recipe/Recipe";

const Home = ()=>{


    const dispatch = useDispatch();
    const recipe = useSelector(state => state.recipes);  // esto es lo mismo que hacer el mapStateToProps (vedio2 35:30)
    const error = useSelector(state => state.error);
    const recipeId = useSelector(s => s.recipe);
    const diets = useSelector(s => s.diets);


    // const [err, setErr] = useState("")
    //---paginacion-----------------

    const [pag, setPag] = useState(1);
    const [order, setOrder] = useState("");

    const cantRecipesXpag = 9;

    const ultimaReciEnPag = pag * cantRecipesXpag;

    const primeraReciEnPag = ultimaReciEnPag - cantRecipesXpag;

    const mostrarRecipes = recipe.slice(primeraReciEnPag, ultimaReciEnPag);

    function pagination(numPag){

        setPag(numPag);
    }

    //-----------------------------

    useEffect(()=>{

        dispatch(getAllRecipes());
        dispatch(getDiets())
        
  
    }, [dispatch]);

    

        
    

    function handleBotonId (e) {

        // console.log("eeeeeeeeeeeeeeee", e)
        dispatch(getRecipeById(e))
    };

    function handleFilterDiets (e){

        // console.log("eeeeeeeeeeee", e.target.value);
        dispatch(filterByDiets(e.target.value));
    };

    function handleOrder (e){

        if(e.target.value === "high health score" || e.target.value === "low health score"){

            dispatch(orderByHealthScore(e.target.value));
            setPag(1);
            setOrder(`ordenado ${e.target.value}`);

        }else{

            dispatch(orderByName(e.target.value));
            setPag(1);
            setOrder(`ordenado ${e.target.value}`);
        }
        
    };

    return (
        <div>

            <div>
                <Searchbar/>
            </div>

            <div>
                
                {recipeId.length > 0 ? null : 

                    <select onChange={(e)=>handleFilterDiets(e)}>

                    <option value="Todo"  >Todo</option>

                        {diets.map(e =>

                            <option value={e} >{e}</option>
                        )}

                    </select>
                }
            </div>

            <div>
                {recipeId.length > 0 ? null : 

                    <select onChange={(e)=> handleOrder(e)} >
                        <option>Order</option>
                        <option value={"high health score"}>high health score</option>
                        <option value={"low health score"}>low health score</option>
                        <option value={"A-Z"}>A-Z</option>
                        <option value={"Z-A"}>Z-A</option>
                    </select>

                }

            </div>

            { !mostrarRecipes.length > 0 ? null : (
                
                <div>
                    <Pagination cantidadReciXPag={cantRecipesXpag} recipes={recipe.length} funPagination={pagination} pag={pag} />
                </div>
            )}

            <div>
                {error.length > 0 ? <p>Recipe not found</p> : 

                    mostrarRecipes.length > 0 || recipeId.length > 0 ? mostrarRecipes.map(e=>(
                        <div>

                            <Recipes key={e.id} recipe={e}  />
                            <button onClick={()=> handleBotonId(e.id)}>detalle</button>
                            <hr/>

                        </div>
                        

                    )) : <h1>cargando</h1>
                }

            </div>

            <div>

                { recipeId.length >0 ? recipeId.map(e => <Recipe key={e.id} recipe={e}/>) : null}

            </div>

        </div>
        
    )
};

export default Home;


//name={e.name} image={e.image} diets={e.diets} healthScore={e.healthScore}

/*
{mostrarRecipes.length > 0 ? mostrarRecipes.map(e=>(

                    <Recipes key={e.id} recipe={e}  />

                )) : <h1>cargando</h1>}
*/