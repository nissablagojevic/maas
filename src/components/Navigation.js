import {
    default as React,
    } from "react";

import {
    BrowserRouter as Router,
    Link,
    Route,
    } from "react-router-dom";


import {
    Timeline,
    } from "../components";

import {
    About,
    } from "./";

import {
    Navbar,
    Nav,
    NavItem,
    //NavDropdown,
    //MenuItem,
    } from "react-bootstrap";

export default function Navigation(props) {
    return (
        <Router>
            <section>
                <Navbar fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">
                                MAAS API example | Nissa Blagojevic
                            </Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem href="/about">About</NavItem>
                    </Nav>
                </Navbar>
                <Route exact path="/" component={Timeline}/>
                <Route path="/about" component={About}/>
            </section>
        </Router>
    );
}
