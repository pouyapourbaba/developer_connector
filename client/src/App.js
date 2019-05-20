import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
