import './App.css';

import {BrowserRouter, Route, Switch} from "react-router-dom";  // el Switch sirve para el caso en que se quiera acceder a /home/algo mas y ese algo mas no sea nada, te lleva al /home. Sin el switch tira error.
import Inicio from "../src/components/Inicio/Inicio";
import Home from "./components/Home/Home";

function App() {
  return (

    <BrowserRouter>
    
      <div className="App">

        <Switch>

          <Route exact path={"/"} component={Inicio} />
          <Route path={"/home"} component={Home}/>
          

        </Switch>
        
      </div>

    
    </BrowserRouter>
  );    
}

export default App;
