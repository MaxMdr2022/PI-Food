import React from "react";
import {Link} from "react-router-dom";
import "./Inicio.css"

const Inicio = ()=>{

    return (
        <div className="inicio">

            <div className="foco" >

                

                    <div className="titulo">

                    <h1 >Proyecto Individual Food</h1>

                    <div className="contenedorBoton">

                      
                    <Link className="link" to ="/home">
                        
                            <button className="boton home">
                                <span>home</span>
                            </button>
                                                
                    </Link>
                        

                    </div>
                    

                </div>
            
                
                

            </div>

        </div>
       
    )
};


export default Inicio;


//23:09