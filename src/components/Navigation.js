import {
    default as React,
    } from "react";

import {
    Link,
    } from "react-router-dom";

import {
    Navbar,
    Nav,
    NavItem,
    } from "react-bootstrap";

function Navigation(props) {
    return (
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
    );
}

export default Navigation;