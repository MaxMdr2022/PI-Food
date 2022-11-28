import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipeByName, getAllRecipes, getDiets, restart, getRecipeById } from "../../redux/action";
import "./searchbar.css"

const Searchbar = ()=> {

    const dispatch = useDispatch();

    const [name, setName] = useState("");



    const handleInputName = (e)=>{

        e.preventDefault();
        setName(e.target.value);
    };


    
    const handleSubmit= (e)=>{


        if(name.length > 0){

            dispatch(getRecipeByName(name));
           
       
        }else{

            dispatch(restart())

            dispatch(getAllRecipes());

        };  
        
    };

   

    return (
        <div className="searchBar">
            

            <input className="input" type="text" placeholder="search.." onChange={(e)=> handleInputName(e)} />

            <button type="submit" onClick={(e)=> handleSubmit(e)}>Search</button>
                        
        </div>
    )
};

export default Searchbar;

