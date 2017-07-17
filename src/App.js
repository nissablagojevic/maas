import {
    default as React,
    Component,
    } from "react";

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import {
    BrowserRouter as Router,
    Route,
    } from "react-router-dom";


import {
    Navigation,
    Timeline,
    About
    } from "./components";

import Helmet from "react-helmet";

class App extends Component {


  render() {
    return (
            <div id="page">
                <Helmet
                    titleTemplate="%s | MAAS API example | Nissa Blagojevic"
                    meta={[
                        { name: `viewport`, content: `width=device-width, initial-scale=1` },
                        { name: `description`, content: `maas api example application` },
                        { property: `og:type`, content: `article` },
                    ]}
                />
                <Router>
                    <div>
                        <Navigation />
                        <Route exact path="/" component={Timeline}/>
                        <Route path="/about" component={About}/>
                    </div>
                </Router>

            </div>




    );
  }
}

export default App;
