import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { pathHome, pathRegister } from "./paths";
import { Home } from "./routes/Home";
import { Register } from "./routes/Register";


export function App(): JSX.Element {
  return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path={pathHome} component={Home} />
          <Route exact path={pathRegister} component={Register} />
          
          <Route component={() => <Redirect to={pathHome} />} />
        </Switch>
      </Router>
  );
}
