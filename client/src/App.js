import './App.css';

import {BrowserRouter, Route, Switch} from "react-router-dom";  // el Switch sirve para el caso en que se quiera acceder a /home/algo mas y ese algo mas no sea nada, te lleva al /home. Sin el switch tira error.
import Inicio from "../src/components/Inicio/Inicio";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";

import Recipe from "./components/Recipe/Recipe";

import axios from "axios";

// import dotenv from "dotenv";
// dotenv.config();

axios.defaults.baseURL = "https://pi-food-production-015d.up.railway.app/" //process.env.REACT_APP  || "http://localhost:3001";


function App() {
  return (

    <BrowserRouter>
    
      <div className="App">

        
        
        <Switch>
          
          <Route exact path={"/"} component={Inicio} />
          <Route path={"/home"} component={Home}/>
          <Route path={"/post"} component={Form}/>
          <Route path={"/detail"} component={Recipe} />

        </Switch>
        
      </div>

    
    </BrowserRouter>
  );    
}

export default App;
