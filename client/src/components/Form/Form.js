import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from "../../redux/action";
import {useHistory} from "react-router-dom";
import Navbar from "../NavBar/Navbar"

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

    const [stepAdd, setStepAdd] = useState([{step1:""}]);



    useEffect(()=> {

        setError(validate(input));

        dispatch(getDiets());
    
    },[dispatch, input]);



    const handleChange = (e)=>{

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const validate = (state)=>{

        const err = {};

        if(!state.name.length){ 
            err.name = "Debe ingresar un nombre";

        }else if(state.name == Number(state.name)){
            err.name = "El nombre no puede ser numerico";
        };

        if(state.image && !/[\/.](gif|jpg|jpeg|tiff|png)$/i.test(state.image)){
            err.image = "URL invalida para imagen"
        }

        if(!state.healthScore.length){
            err.healthScore = "Debe ingresar un valor de nivel de salud";

        }else if(state.healthScore != Number(state.healthScore) ){
            err.healthScore = "El nivel de salud debe ser numerico";

        }else if(state.healthScore > 100 || state.healthScore < 0){
            err.healthScore = "Solo valores entre 0-100";
        };

        if(!state.summary.length) err.summary = "Debe agregar un summay";
       

        if(!state.step.length > 0 || state.step == "" || state.step ==  " "){
            err.step = "Debe agregar los pasos";
        
        }else{

            for (let i=0; i<=state.step.length; i++){

                if(state.step[i] == "" || state.step[i] ==" "){

                    err.step = "Debe agregar los pasos";
                }
            }
        }

        if(!state.diets.length) err.diets = "Debe seleccionar al menos un tipo de dieta";

        return err;
    };

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

    //------------diets---------------------

    const handleSelectDiet = (e) => {
        // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeee",e.target.value)

        let checkbox = document.getElementById(`${e.target.value}`);

        // console.log("cheeeeeeeeeeeeeeee",checkbox.checked)

       

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

    //------------Step------------------
    const handleAddStep = (e) =>{
        e.preventDefault();
        setStepAdd([...stepAdd, {step1: ""}])
    };

    const handleCambioStep = (e, i)=>{


        const {name, value} = e.target

        const list = [...stepAdd]

        list[i][name] = value

        setStepAdd(list)

        const ar = stepAdd.map(el => el.step1)
        setInput({

            ...input,
            step:[...ar ]
        })
    }

    const handleDeleteStep = (e,i) =>{
        e.preventDefault();

        const deletStep = [...stepAdd]
        deletStep.splice(i,1)
        setStepAdd(deletStep)

        const ar = [...input.step]
        ar.splice(i,1)
        setInput({

            ...input,
            step:[...ar ]
        })
  
    }
    //--------------------------------


    return(
        <div>

            <div>
                <Navbar/>
            </div>

            <h3>Crear receta</h3>

            <form autoComplete="off">

                <div>

                    <label>Nombre</label>
                    <input type={"text"} name={"name"} placeholder={`${error.name && error.name}`} value={input.name} onChange={(e)=> handleChange(e)} />
                    {error.name === "El nombre no puede ser numerico" ? <span>El nombre no puede ser numerico</span> : null}

                </div>

                <div>

                    <label>Imagen</label>
                    <input type={"text"} name={"image"} value={input.image} onChange={(e)=> handleChange(e)} />
                    {error.image ? <span>URL invalida para imagen</span> : null}
                    
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
                    
                    
                    
                     {stepAdd.map( (data, i ) => 
                        <div key={i}>

                            <span><input type={"text"} name={"step1"} placeholder={ error.step == undefined ? "Debe agregar los pasos" : `${error.step && error.step}`} value={data.step1} onChange={ e =>handleCambioStep(e,i)}  /></span>  
                            {stepAdd.length !== 1 && <button onClick={(e)=> handleDeleteStep(e,i)}>x</button>}
                            { stepAdd.length -1 === i && <span><button  onClick={(e)=>handleAddStep(e)}>Add Step</button></span>}
                            
                        </div>

                    )}
                </div>

                <div>

                    <label>Diets</label>

                    { diets.map( e => 
                            
                        <label key={e}><input type={"checkbox"} id={`${e}`} name={`diets`} value={e} onClick={(e)=> handleSelectDiet(e)} />{e}</label>
                    
                    )}
                    <p>{error.diets && error.diets}</p>
                </div>



                <button type="submit" hidden = {!Object.keys(error).length ? false : true} onClick={handleSubmit}>Crear</button>

            </form>
        </div>
    )
};


export default Form;

