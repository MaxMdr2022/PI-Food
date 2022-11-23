import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getRecipeById } from "../redux/action";
export const Put = () =>{

    const recipe = useSelector(s => s.recipe);

    const history = useHistory()

        console.log(recipe)
    const [input, setInput] = useState({

        name: recipe[0].name,
        summary: recipe[0].summary,
        healthScore: recipe[0].healthScore, 
        // step: recipe.step, 
        // image: recipe[0].image, 
        // diets: recipe.diets
    })

    

    console.log(input)

    const handleSubmit = async (e) =>{

        e.preventDefault();
        try {
            
            

            await axios.put("http://localhost:3001/recipes/", {

                id: recipe[0].id,
                name: input.name,
                healthScore: input.healthScore,
                summary: input.summary
                
            }) 
            
            history.push("/home");

        } catch (error) {
            
            alert("error")
        }
    };

    const handleChange = (e) =>{

        setInput({

            ...input,
            [e.target.name]: e.target.value
        })

       
    }

    return(

        <div>

            <form>

                <label>name</label>
                <input name="name" value={input.name} type="text" onChange={(e) => handleChange(e)}/>

              

                <label>healthScore</label>
                <input name="healthScore" value={input.healthScore} type="text" onChange={(e) => handleChange(e)}/>

                <label>summary</label>
                <input name="summary" value={input.summary} type="text" onChange={(e) => handleChange(e)}/>

               

                <button onClick={(e) => handleSubmit(e)}>Cambiar</button>

            </form>

        </div>
    )

};



//----------------------------------------------------------------
// export class Put extends React.Component{

//     constructor(props){

//         super(props);

        
//         this.state = {

//             name: this.props.recipe.name,
//             summary: this.props.recipe.summary,
//             healthScore: this.props.recipe.healthScore,
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);

//     }


//       handleSubmit (){

//         axios.put("http://localhost:3001/recipes/", {

//                 id: this.props.recipe[0].id,
//                 ...this.state
                
//             })
//     }

//     handleChange(e){

//         this.props.setState({

//             ...this.state,
//             [e.target.name]: e.target.value
//         })

//     }


//     render(){

//         return(

//             <div>

//              <form>

//                  <label>name</label>
//                  <input name="name" value={this.state.name} type="text" onChange={(e) => this.handleChange(e)}/>

              

//                  <label>healthScore</label>
//                  <input name="healthScore" value={this.state.healthScore} type="text" onChange={(e) => this.handleChange(e)}/>

//                  <label>summary</label>
//                 <input name="summary" value={this.state.summary} type="text" onChange={(e) => this.handleChange(e)}/>

               

//                 <button onClick={(e) => this.handleSubmit(e)}>Cambiar</button>

//             </form>

//         </div>
//         )
//     }

// }

// export const mapStateToProps = (state) =>{

//     return {

//         recipe: state.recipe
//     }
// }

// export default connect(mapStateToProps)(Put)