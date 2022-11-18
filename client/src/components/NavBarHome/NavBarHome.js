import React from "react";
import {Link} from "react-router-dom";



const NavBarHome = ()=>{



    return(
        <div>

            <Link to={"/"}>

                <button>Inicio</button>
            </Link>

            <Link to={"/home"}>

                <button  type="button" onClick={() => window.location.reload()}>Home</button>
               

            </Link>

            <Link to={"/post"}>

                <button>Form</button>
            </Link>
        </div>
    )
};

export default NavBarHome;
