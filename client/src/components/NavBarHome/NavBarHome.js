import React from "react";
import {Link} from "react-router-dom";
import "./NavBarHome.css"


const NavBarHome = ()=>{



    return(
        <div className="botones">

            <Link to={"/"}>

                <button>Inicio</button>
            </Link>

            <Link to={"/home"}>

                <button  type="button" onClick={() => window.location.reload()}>Home</button>
               

            </Link>

        </div>
    )
};

export default NavBarHome;
