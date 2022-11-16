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

        if(!state.name.length){ 
            err.name = "Debe ingresar un nombre";

        }else if(state.name == Number(state.name)){
            err.name = "El nombre no puede ser numerico";
        };

        if(!state.healthScore.length){
            err.healthScore = "Debe ingresar un valor de nivel de salud";

        }else if(state.healthScore != Number(state.healthScore) ){
            err.healthScore = "El nivel de salud debe ser numerico";

        }else if(state.healthScore > 100 || state.healthScore < 0){
            err.healthScore = "Solo valores entre 0-100";
        };

        if(!state.summary.length) err.summary = "Debe agregar un summay";
        if(!state.step.length) err.step = "Debe agregar los pasos";
        if(!state.diets.length > 0) err.diets = "Debe seleccionar al menos un tipo de dieta";

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

    // console.log("dd", input.diets);

    const [stepAdd, setStepAdd] = useState([])

    const handleAdd = (e) =>{
        e.preventDefault();
        const abc = [...stepAdd, []]
        setStepAdd(abc)
    };

    const handleCambio = (e, i)=>{

        const data = [...stepAdd]

        data[i] = e.target.value

        setStepAdd(data)
        
        // input.step.push(data[i])
        setInput({

            ...input,
            step:[...input.step, [e.target.value] ]
        })
    }

    const handleDelete = (e,i) =>{
        e.preventDefault();
        const deletStep = [...stepAdd]
        deletStep.splice(i,1)
        setStepAdd(deletStep)

        const deletStepInput = [...input.step]
        deletStepInput.splice(i, 1)
        setInput({

            ...input,
            step:[...input.step, deletStepInput]
        })
    }
    



 // mejorar las validaciones healthscore no puede ser string, y lo q pide el readme en validaciones, despues modular algunos componentes, ver lo del boton en el landingpage y creo q ya quedaria
   
 // en el back ver el middlewaate etc...   onSubmit={(e) => handleSubmit(e)}
    return(
        <div>

            <h3>Crear receta</h3>

            <form >

                <div>

                    <label>Nombre</label>
                    <input type={"text"} name={"name"} placeholder={`${error.name && error.name}`} value={input.name} onChange={(e)=> handleChange(e)} />
                    {error.name === "El nombre no puede ser numerico" ? <span>El nombre no puede ser numerico</span> : null}

                </div>

                <div>

                    <label>Imagen</label>
                    <input type={"text"} name={"image"} value={input.image} onChange={(e)=> handleChange(e)} />
                    
                </div>

                <div>

                    <label>healthScore</label>
                    <input type={"text"} name={"healthScore"} placeholder={`${error.healthScore && error.healthScore}`} value={input.healthScore} onChange={(e)=>handleChange(e)} />
                    {error.healthScore === "El nivel de salud debe ser numerico" ? <span>El nivel de salud debe ser numerico</span> : null}
                    {error.healthScore === "Solo valores entre 0-100" ? <span>Solo valores entre 0-100</span> : null}
                </div>

                <div>

                    <label>Summary</label>
                    <input type={"text"} name={"summary"} placeholder={`${error.summary && error.summary}`} value={input.summary} onChange={(e)=> handleChange(e)} />
                    
                </div>

                <div>

                    <label>Step</label>
                    <input type={"text"} name={"step"} placeholder={`${error.step && error.step}`} value={input.step} onChange={(e)=> handleStep(e)} />
                    <span><button hidden={input.step.length > 0 ? false : true} onClick={(e)=>handleAdd(e)}>Add Step</button></span>
                    
                    {input.step.length > 0 ? stepAdd.map( (data, i) => 
                        <div>
                            <input type={"text"} name={"step"} placeholder={`${error.step && error.step}`} value={data} onChange={ e =>handleCambio(e,i)}  />  
                            <button onClick={(e)=> handleDelete(e,i)}>x</button>
                        </div>

                    ): null }
                </div>

                <div>
                    <label>Diets</label>

                    { diets.map( e => 
                            
                        <label><input type={"checkbox"} id={`${e}`} name={`diets`} value={e} onClick={(e)=> handleSelect(e)} />{e}</label>
                    
                    )}
                    <p>{error.diets && error.diets}</p>
                </div>

                <button type="submit" hidden = {!Object.keys(error).length ? false : true} onClick={handleSubmit}>Crear</button>

            </form>
        </div>
    )
};


export default Form;


//<input type={"text"} name={"step"} placeholder={`${error.step && error.step}`} value={input.step} onChange={(e)=> handleStep(e)} /> : null  