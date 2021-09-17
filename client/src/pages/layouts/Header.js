import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import React from "react";

import  axios from 'axios';

function Header() {
    let user_name = JSON.parse(localStorage.getItem('user_name'));
    const history = useHistory();

    function logOut(){
        axios.post('api/logout-user').then(response => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_name');
            history.push('/login')
        });
    }


    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Navbar</Navbar.Brand>
                    <Nav className="me-auto navbar-link">
                        <Link to="/index">Home</Link>
                        {
                            localStorage.getItem('auth_token') ?
                            <>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="/products">Products</Link>
                            </>

                            :

                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        }
                    </Nav>

                    {
                        localStorage.getItem('auth_token') ?
                            <>
                                <Nav>
                                    <NavDropdown title={user_name}>
                                        <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>

                            :

                            <></>
                    }

                </Container>
            </Navbar>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Header;