import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import IconHc from '../assets/icon-hc.png'

export default function Header() {
    return (
        <div>
            <Navbar bg="light" expand="lg" className='navbar' fixed="top">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={IconHc}
                        width="40"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Item>
                            <Nav.Link href="/">Dashboard</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
};
