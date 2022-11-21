import React, { Component } from "react";

// import components
import Search from './Search'
import Header from './Header'
//import boostrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


class Main extends Component{
    constructor(props) {
        super (props)
    }
    render(){

        return(
            <>
            <Container fluid>
                <Row>
                    <Header/>
                </Row>
                <Row >
                    <Search/>
                </Row>
            </Container>
            </>
        )
    }
}

export default Main