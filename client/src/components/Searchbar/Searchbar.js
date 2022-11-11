import React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeByName, getAllRecipes } from "../../redux/action";

const Searchbar = ()=> {

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const handleInputName = (e)=>{

        // e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit= (e)=>{

        
        if(name.length > 0){
            // e.preventDefault();
            
            dispatch(getRecipeByName(name));
            setName("");
       
        }else{
            dispatch(getAllRecipes());

        };  
        
    };

    return (
        <div>

            <input type="text" placeholder="buscar.." onChange={(e)=> handleInputName(e)} />

            
            <button type="submit" onClick={(e)=> handleSubmit(e)}>Buscar</button>
        </div>
    )
};

export default Searchbar;


/*
onClick={(e)=> handleSubmit(e)}



if(name.length > 0){

            // e.preventDefault();
            dispatch(getRecipeByName(name));
            setName("");

        }else{

            dispatch(getAllRecipes())
        }

*/