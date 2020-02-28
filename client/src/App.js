import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Main from "./pages/Main";
import Admin from "./pages/Admin";
import Page404 from "./pages/Page404";
import { AuthProvider } from "./context/auth";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/theme";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Redirect from="/" to="/zessence" exact />
            <Route path="/zessence" component={Main}  />
            <Route path="/zeadmin" component={Admin}  />
            <Route component={Page404} />
          </Switch>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
