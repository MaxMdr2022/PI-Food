import React from "react";
import {Link} from "react-router-dom";
import { restart, getAllRecipes } from "../../redux/action";
import { useDispatch } from "react-redux";



const Navbar = ()=>{

    const dispatch = useDispatch(); 

    const handleRestart = ()=>{

        dispatch(restart());
        dispatch(getAllRecipes());
    };

    return(
        <div>

            <Link to={"/"}>

                <button>Inicio</button>
            </Link>

            <Link to={"/home"}>

                <button onClick={()=>handleRestart()}>Home</button>

            </Link>

            <Link to={"/post"}>

                <button>Form</button>
            </Link>
        </div>
    )
};

export default Navbar;
