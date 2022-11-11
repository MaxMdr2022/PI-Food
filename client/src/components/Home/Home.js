import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/action";
import Recipes from "../Recipes/Recipes";
import Pagination from "../Pagination/Pagination";
import Searchbar from "../Searchbar/Searchbar";

const Home = ()=>{


    const dispatch = useDispatch();
    const recipe = useSelector(state => state.recipes);  // esto es lo mismo que hacer el mapStateToProps (vedio2 35:30)
    const error = useSelector(state => state.error);

    // const [err, setErr] = useState("")
    //---paginacion-----------------

    const [pag, setPag] = useState(1);

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
    
    }, [dispatch]);

    console.log(error)
    return (
        <div>

            <div>
                <Searchbar/>
            </div>

            { !mostrarRecipes.length > 0 ? null : (
                
                <div>
                    <Pagination cantidadReciXPag={cantRecipesXpag} recipes={recipe.length} funPagination={pagination} pag={pag} />
                </div>
            )}

            <div>
                {error.length > 0 ? <p>Recipe not found</p> : 

                    mostrarRecipes.length > 0 ? mostrarRecipes.map(e=>(
                        <div>

                            <Recipes key={e.id} recipe={e}  />
                            <button >detalle</button>
                            <hr/>

                        </div>
                        

                    )) : <h1>cargando</h1>
                }

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