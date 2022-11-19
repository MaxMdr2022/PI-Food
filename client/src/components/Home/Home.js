import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../../redux/action";
import Recipes from "../Recipes/Recipes";
import Pagination from "../Pagination/Pagination";
import Searchbar from "../Searchbar/Searchbar";
import NavBarHome from "../NavBarHome/NavBarHome"
import { getRecipeById, getDiets, filterByDiets, orderByHealthScore, orderByName } from "../../redux/action";
import "../Home/Home.css"


const Home = ()=>{


    const dispatch = useDispatch();
    const recipe = useSelector(state => state.recipes);  // esto es lo mismo que hacer el mapStateToProps (vedio2 35:30)
    const error = useSelector(state => state.error);
    const recipeId = useSelector(s => s.recipe);
    const diets = useSelector(s => s.diets);


   
    //---paginacion-----------------

    const [pag, setPag] = useState(1);
    const [order, setOrder] = useState("");

    const cantRecipesXpag = 9;

    const ultimaReciEnPag = pag * cantRecipesXpag;

    const primeraReciEnPag = ultimaReciEnPag - cantRecipesXpag;

    const mostrarRecipes = recipe.slice(primeraReciEnPag, ultimaReciEnPag);

    function pagination(numPag){

        setPag(numPag);
    };

    //-----------------------------

    useEffect(()=>{

        dispatch(getAllRecipes());
        dispatch(getDiets());
        

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
        <div className="cont">

            <div className="baner">

                <NavBarHome/>
            
                <div className="searchBar">
                <Searchbar/>
                </div>

                <div className="filters">


                    <div className="filterDiets">
                        

                        <select onChange={(e)=>handleFilterDiets(e)}>

                        <option value="Todo"  >Todo</option>

                            {diets.map((e) =>

                                <option key={e} value={e} >{e}</option>
                            )}

                        </select>

                    </div>

                    <div className="filterOrder">

                        <select  onChange={(e)=> handleOrder(e)} >
                            <option>---- Order ----</option>
                            <option value={"high health score"}>high health score</option>
                            <option value={"low health score"}>low health score</option>
                            <option value={"A-Z"}>A-Z</option>
                            <option value={"Z-A"}>Z-A</option>
                        </select>

                    
                    
                    </div>
                </div>
                
                <div className="btnForm">

                    <Link to={"/post"}>

                        <button>Form</button>
                    </Link>

                </div>

            </div>



            <div>

                { !mostrarRecipes.length > 0 ? null : (
                
               
                    <Pagination  cantidadReciXPag={cantRecipesXpag} recipes={recipe.length} funPagination={pagination} pag={pag} />
                
                )}

            </div>
            

            <div className="recipes">



                    {error.length > 0 ? <div className="notFound"><p>Recipe Not Found</p></div> : 

                        mostrarRecipes.length > 0  ? mostrarRecipes.map((e)=>(
                            <div className="tarjeta" key={e.id}>


                                <Recipes key={e} recipe={e}  />
                            
                                <div className="btnRecipes">

                                    <div className="btnRecipes2">

                                        <Link  to={"/detail"}>

                                            <button className="btnDetalle" key={e} onClick={()=> handleBotonId(e.id)}>detalle</button>
                                        </Link>
                                    </div>

                                    
                                </div>
                                
                                
                                

                            </div>
                            

                        )) : <div className="loading"><p>Cargando...</p></div>
                    }
            </div>

                

    
            
        </div>
        
    )
};

export default Home;
