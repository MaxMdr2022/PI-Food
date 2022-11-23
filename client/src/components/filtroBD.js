import React from "react";
import { connect } from "react-redux";
import { filterBD } from "../redux/action";

export  class FiltroBD extends React.Component{

   constructor(props){

    super(props);

    this.handleChange = this.handleChange.bind(this)
   }

   handleChange(evento){

    let aee = [ 1, 3, 4, 5]
   

    this.props.filterBD(evento.target.value)

   };
    render(){
        return (
            <div>               
                <select  onChange={this.handleChange} >

                    <option>---- Order ----</option>
                    <option value={"todos"}>Todo</option>
                    <option value={"creado"}>Created</option>
                    <option value={"api"}>Api</option>
                    
                </select>
            </div>
        )
    }
};

export const mapDispatchToProps = {filterBD};

export default connect(null, mapDispatchToProps)(FiltroBD);