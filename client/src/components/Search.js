import React, { Component } from "react";

import Results from './Results'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from "react-bootstrap/Container";

class Search extends Component{
    constructor(props) {
        super (props)
        this.state = {
            error: null,
            isLoaded: false,
            resultHub:[],
            resultLab:[],
            search:''
        }

        this.input = this.input.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // sets state value from search input
    input(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
           [name] : value
        });
    }

    // sends input name to server using fetch api
    handleSubmit(event){
        event.preventDefault();
        const searchTerm = this.state.search;
        
        const data = {name:searchTerm}
        
        // github query
        fetch(`/github/search`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            })
            // parses response to JSON
            .then(response => response.json()) 
            // returns back resuly from server
            .then(
                (result) => {
                    // result is store in state
                    this.setState({
                        isLoaded: true,
                        resultHub: result.items
                    });
                }
            )
            
            // getlab query
            fetch(`/gitlab/search`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                })
                // parses response to JSON
                .then(response => response.json()) 
                // returns back result from server
                .then(
                    (result) => {
                        // result is stored in state
                        this.setState({
                            isLoaded: true,
                            resultLab: result
                        });
                    }
                )
    }
    render(){

        return(
            
            <Container>
                
                {/* search bar*/}
                <Form >
                    <Row md="4" className="justify-content-md-center">
                        <Col md="3">
                            <Form.Group>
                                <Form.Control id="search" name="search" type="text" onChange={this.input}/>
                            </Form.Group>
                        </Col>
                        <Col>
                        <Button type="submit" onClick={this.handleSubmit}>Search</Button>
                        </Col>
                    
                    </Row>
                </Form>
                
                {/* results from state are sent as props to results compontent */}
                <div >
                    <Results  resultHub= {this.state.resultHub} resultLab = {this.state.resultLab}/>
                </div>
            </Container>
        )
    }
}

export default Search