import React from "react";
import { connect } from "react-redux";
import { filterBD } from "../../redux/action";

export default class FiltroBD extends React.Component{

    constructor(props){

        super(props);

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(evento){

        this.props.funcionHandle(evento)
      
    };



    render(){
        return (
            <div>               
                <select  onChange={this.handleChange} >    {/*this.handleChange*/}

                    <option>---- Order ----</option>
                    <option value={"todos"}>Todo</option>
                    <option value={"creado"}>Created</option>
                    <option value={"api"}>Api</option>
                    
                </select>
            </div>
        )
    }
};

// export const mapDispatchToProps = {filterBD};

// export default connect(null, mapDispatchToProps)(FiltroBD);