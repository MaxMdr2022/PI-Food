import React from "react";
import {Link} from "react-router-dom";
import "../NavBar/NavBar.css";



const Navbar = ()=>{

 

    return(
        <div className="nav2">

            <Link to={"/"}>

                <button>Inicio</button>
            </Link>

            <Link to={"/home"}>

                <button >Home</button>

            </Link>

            <Link to={"/post"}>

                <button>Form</button>
            </Link>
        </div>
    )
};

export default Navbar;
