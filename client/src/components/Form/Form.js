import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

const Form = () =>{

    const dispatch = useDispatch();

    const diets = useSelector(s=> s.diets);

    const [input, setInput] = useState({

        name: "",
        image:"",
        healthScore: 0,
        summary:"",
        step:[],
        diets:[]
    });

    const [error, setError] = useState("");

    const handleChange = (e)=>{

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };


    

    return(
        <div>Form</div>
    )
};


export default Form;