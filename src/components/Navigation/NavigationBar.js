import React, { Component } from 'react'
import {Navbar, Button, Nav} from "react-bootstrap";
import {Link, NavLink} from 'react-router-dom'
import {AiFillCar} from 'react-icons/ai';
import LoginModal from '../Auth/LoginModal'


export default class NavigationBar extends Component {
    state = {showLogin: false};

    showLoginModal = () => {
        this.setState({showLogin:true})
    };

    hideLoginModal = () => {
        this.setState({showLogin: false})
    };

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="sm">
                    <Navbar.Brand as={Link} to="/">Car{' '}<AiFillCar />{' '}Pooling.gr</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={NavLink} to="/">Αρχική</Nav.Link>
                            <Nav.Link as={NavLink} to="/page1">Page 1</Nav.Link>
                        </Nav>

                        <Button variant='light' onClick={this.showLoginModal}>Σύνδεση</Button>
                        <Button variant='outline-light'>Εγγραφή</Button>

                    </Navbar.Collapse>
                </Navbar>

                <LoginModal show={this.state.showLogin} onHide={() => this.hideLoginModal()}/>
          </div>
    )
  }
}