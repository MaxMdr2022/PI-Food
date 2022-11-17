import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName, getAllRecipes, getDiets } from "../../redux/action";

const Searchbar = ()=> {

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const handleInputName = (e)=>{

        e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit= (e)=>{

        
        if(name.length > 0){
            e.preventDefault();
            
            dispatch(getRecipeByName(name));
            dispatch(getDiets())
       
        }else{
            dispatch(getAllRecipes());
            dispatch(getDiets())

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

