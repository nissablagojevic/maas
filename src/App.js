import {
    default as React,
    Component,
    } from "react";

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import {
    Navigation,
    } from "./components";

import Helmet from "react-helmet";

class App extends Component {
  render() {
    return (
        <header>
        <Helmet
      titleTemplate="%s | MAAS API example | Nissa Blagojevic"
      meta={[
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      { name: `description`, content: `maas api example application` },
      { property: `og:type`, content: `article` },
  ]}
/>
            <Navigation />

            </header>
    );
  }
}

export default App;
