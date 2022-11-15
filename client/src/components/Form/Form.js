import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../redux/action";
import {useHistory} from "react-router-dom";

const Form = () =>{

    const dispatch = useDispatch();
    const history = useHistory();

    const diets = useSelector(s=> s.diets);

    const [input, setInput] = useState({

        name: "",
        image:"",
        healthScore: "",
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

    const handleStep = (e) =>{

        if(!e.target.value.length > 0){

            setInput({

                ...input,
                step:[]
            })
        }else{

            setInput({
                ...input,
                step:[e.target.value]
            })
        }
        
    };

    const validate = (state)=>{

        const err = {};

        if(!state.name.length) err.name = "Debe ingresar un nombre";
        if(!state.healthScore.length) err.healthScore = "Debe ingresar un valor de nivel de salud";
        if(!state.summary.length) err.summary = "Debe agregar un summay";
        if(!state.step.length) err.step = "Debe agregar los pasos";
        if(!state.diets.length > 0) err.diets = "Debe seleccionar al menos un tipo de dieta"

        return err;
    };

    useEffect(()=> {

        setError(validate(input));

        dispatch(getDiets());
    
    },[dispatch, input]);



    const handleSubmit = (e)=>{

        e.preventDefault();

        if(!Object.keys(error).length){

            dispatch(postRecipe(input));

            setInput({
                name: "",
                image:"",
                healthScore: "",
                summary:"",
                step:[],
                diets:[]
            });

            history.push("/home");

        }else{

            alert("Debes cmpletar todo el formulario");
        };
    };

    const handleSelect = (e) => {
        // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeee",e.target.value)

        let checkbox = document.getElementById(`${e.target.value}`);

        console.log("cheeeeeeeeeeeeeeee",checkbox.checked)

        

        if(checkbox.checked === false){

            let arr = input.diets.filter( el=> el != e.target.value);

            if(!arr.length > 0){

                setInput({

                    ...input,
                    diets: []
                })

            }else{

                setInput({

                    ...input,
                    diets: arr
                })
            }
            

        }else if(checkbox.checked === true){

            setInput({

                ...input,
                diets: [...input.diets,  e.target.value]
            })
        }
        
       
    };

 console.log("dd", input.diets);




 // mejorar las validaciones healthscore no puede ser string, y lo q pide el readme en validaciones, despues modular algunos componentes, ver lo del boton en el landingpage y creo q ya quedaria
   
 // en el back ver el middlewaate etc...
    return(
        <div>

            <h3>Crear receta</h3>

            <form onSubmit={(e) => handleSubmit(e)}>

                <div>

                    <label>Nombre</label>
                    <input type={"text"} name={"name"} placeholder={`${error.name && error.name}`} value={input.name} onChange={(e)=> handleChange(e)} />
                    

                </div>

                <div>

                    <label>Imagen</label>
                    <input type={"text"} name={"image"} value={input.image} onChange={(e)=> handleChange(e)} />
                    
                </div>

                <div>

                    <label>healthScore</label>
                    <input type={"text"} name={"healthScore"} placeholder={`${error.healthScore && error.healthScore}`} value={input.healthScore} onChange={(e)=>handleChange(e)} />
                  
                </div>

                <div>

                    <label>Summary</label>
                    <input type={"text"} name={"summary"} placeholder={`${error.summary && error.summary}`} value={input.summary} onChange={(e)=> handleChange(e)} />
                    
                </div>

                <div>

                    <label>Step</label>
                    <input type={"text"} name={"step"} placeholder={`${error.step && error.step}`} value={input.step} onChange={(e)=> handleStep(e)} />
                    
                </div>

                <div>
                    <label>Diets</label>

                    { diets.map( e => 
                            
                        <label><input type={"checkbox"} id={`${e}`} name={`diets`} value={e} onClick={(e)=> handleSelect(e)} />{e}</label>
                    
                    )}
                    <p>{error.diets && error.diets}</p>
                </div>

                <button type="submit" hidden = {!Object.keys(error).length ? false : true} >Crear</button>

            </form>
        </div>
    )
};


export default Form;