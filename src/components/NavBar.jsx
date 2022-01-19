import React from 'react'


import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";



const NavBar = ( props ) => {

    const handleLogout = () => {
        localStorage.clear();
        window.location.replace('auth/login')       
    };



    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand className = "font-weight-bold">JavaScript API</Navbar.Brand>
                <Nav className = "me-auto">
                    <LinkContainer to = "/">
                        <Nav.Link>Inicio</Nav.Link>
                    </LinkContainer>
                </Nav>

                <p className='justify-content-end' style={{ color: 'white', margin: '0' }}>
                    Bienvenido, <strong>{ props.username }</strong>
                </p>
            </Container>
            <Button     className = "justify-content-end" 
                            variant="outline-danger" 
                            style={{marginRight: '2rem'}}
                            onClick={ handleLogout }
                >
                        Logout
                </Button>
        </Navbar>
    )
}

export default NavBar
