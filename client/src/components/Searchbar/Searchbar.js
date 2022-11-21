import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName, getAllRecipes, getDiets, restart } from "../../redux/action";
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
            e.preventDefault();
            
            dispatch(restart())


            dispatch(getRecipeByName(name));
            dispatch(getDiets())
       
        }else{

            dispatch(restart())

            dispatch(getAllRecipes());
            dispatch(getDiets())

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

