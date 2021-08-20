import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';


function App(props) {
    return (
        <Container maxWidth='lg'>
            <Navbar></Navbar>
            <Switch>
                <Route path='/' exact component={Home}></Route>
                <Route path='/auth' exact component={Auth}></Route>
            </Switch>
        </Container>
    );
}

export default App;