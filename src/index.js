import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { createStore } from "redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import rootReducer from "./redux/reducers";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
import SignIn from "./SignIn";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./context/AuthContext"

import PrivateRoute from "./PrivateRoute"

const store = createStore(rootReducer);

document.title = "Paris JJ";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/signIn" exact component={SignIn} />
          <Route path="/register" exact component={Register} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <PrivateRoute  path="/" component={Layout} />
        </Switch>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
