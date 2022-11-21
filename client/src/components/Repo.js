// profile component displays all personal information
import React, { Component } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button'

// Repo component function
class Repo extends Component{
    constructor(props) {
        super (props)
        this.state ={
            commitHub: {data: []},
            commitLab: {data: []},
            isLoaded: false
        }
        this.getHubCommit = this.getHubCommit.bind(this)
        this.getLabCommit = this.getLabCommit.bind(this)
    }
    //event handler sends request to server when repo is clicked
    getHubCommit(event){
        
        const fullName = event;
        const data = {name:fullName};

        fetch(`/github/commit`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            })
            // parses response to JSON
            .then(response => response.json()) 
            // returns back data from server
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        commitHub: result
                    });
                }
            )
            
    }
    //event handler sends request to server when repo is clicked
    getLabCommit(event){
        
        const id = event;
        const data = {id:id};

        fetch(`/gitlab/commit`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            })
            // parses response to JSON
            .then(response => response.json()) 
            // returns back data from server
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        commitLab: result
                    });
                }
            )
    }
    render(){
        const repoData = this.props.repoData;
        // if statement displays repos based on user profile clicked
        if (repoData.length > 0){
            const data = repoData[0];
            // if show github repo
            if(data.hasOwnProperty('full_name')){
                return(
                    <div className='cotainer-fluid'>
                        <Accordion>
                            {repoData.map(item =>(
                                <Accordion.Item eventKey={item.full_name} >
                                    <Accordion.Header onClick={() => {this.getHubCommit(item.full_name)} }>{item.full_name}</Accordion.Header>
                                        <Accordion.Body>
                                            <p><b>created:</b> {item.created_at.slice(0, item.created_at.indexOf('T'))} <b>last updated:</b> {item.updated_at.slice(0, item.updated_at.indexOf('T'))}</p>
                                            <p>{item.description}</p>
                                            <p><b>Commit descriptions:</b></p>
                                            <ul>{this.state.commitHub.data.map(item => {
                                                  if(item.length>0){
                                                    return<li>{item.commit.committer.date.slice(0, item.commit.committer.date.indexOf('T'))}: {item.commit.message}</li>
                                                  } 
                                                  else{
                                                    return<li>{item.commit.committer.date.slice(0, item.commit.committer.date.indexOf('T'))}: {item.commit.message}</li>
                                                } 
                                            }  
                                            )}</ul>
                                            <Button variant="outline-secondary" href={item.html_url} target="_blank"><img src="./images/GitHub.png" width="30" height="30" className="d-inline-block align-top" alt="Github logo"/> Repo</Button>
                                        </Accordion.Body>
                                </Accordion.Item>
                            ))} 
                        </Accordion>  
                    </div>
                )
            }
            // if show gitlab repo
            else if (data.hasOwnProperty('path_with_namespace')){
                return(
                    <div className='cotainer-fluid'>
                    <Accordion>
                        {repoData.map(item =>(
                            <Accordion.Item eventKey={item.id}>
                                <Accordion.Header onClick={() => {this.getLabCommit(item.id)}}>{item.path_with_namespace}</Accordion.Header>
                                    <Accordion.Body>
                                        <p><b>created:</b> {item.created_at.slice(0, item.created_at.indexOf('T'))} <b>last updated:</b> { item.last_activity_at.slice(0, item.last_activity_at.indexOf('T'))}</p>
                                        <p>{item.description}</p>
                                        <p><b>Commit descriptions:</b></p>
                                        <ul>{this.state.commitLab.data.map(item => {
                                                  if(item.length>0){
                                                    return<li>{item.committed_date.slice(0, item.committed_date.indexOf('T'))}: {item.message}</li>
                                                  } 
                                                  else{
                                                    return<li>{item.committed_date.slice(0, item.committed_date.indexOf('T'))}: {item.message}</li>
                                                } 
                                            }                                 
                                            )}</ul>
                                        <Button variant="outline-warning" href={item.web_url} target="_blank"><img src="./images/gitlab.png" width="30" height="30" className="d-inline-block align-top" alt="Gitlab logo"/> Repo</Button>
                                    </Accordion.Body>
                            </Accordion.Item>
                        ))}
                        
                    </Accordion>  
                </div>  
                )
            }
        }
        else{
            return(
                <p>no data</p>
            )
        }
    }
}

//export Repo component so it can be imported into other components
export default Repo

