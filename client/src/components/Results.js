import React, { Component } from "react";


// import components
import Bio from './Bio'
import Repo from './Repo'

// impot bootstrap 
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'


// this is statefuk component 
class Results extends Component{
    constructor(props) {
        super (props)
         this.state = {
            error: null,
            hubProfile: '',
            labProfile: '',
            isLoadedHub: false,
            isLoadedLab: false,
            response:[]
         }
         this.getHubProfile = this.getHubProfile.bind(this)
         this.getLabProfile = this.getLabProfile.bind(this)

    }
    
    // event handler sends request to server when user is clicked
    getHubProfile(event){
        
        const value = event.target.value;
        const data = {name:value};

       // sends name of user to github api 
        fetch(`/github/profile`, {
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
                        isLoadedHub: true,
                        hubProfile: result
                    });
                }
            )
            // sets gitlab load boolean to false -> display functionality
            this.setState({isLoadedlab:false }) 
            
        
    }

    // event handler sends request to server when user is clicked
    getLabProfile(event){

        const value = event.target.value;
        const data = {id:value};
  
        // sends name of user to gitlab api 
        fetch(`/gitlab/profile`, {
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
                        isLoadedLab: true,
                        labProfile: result
                    });
                }
            ) 
        
        // sets github load boolean to false -> display functionality
        this.setState({isLoadedHub:false })      
    }

    render(){
        //received props from search component
        const resultHub = this.props.resultHub;
        const resultLab = this.props.resultLab;

        const error = this.state.error;
        //loaded boolean variables to check if server request are succesful
        const isLoadedHub = this.state.isLoadedHub;
        const isLoadedLab = this.state.isLoadedLab;

        // if statements used to display render based on states of isloaded variables
        if (isLoadedHub == true){
            const bioData = this.state.hubProfile.bio;
            const repoData = this.state.hubProfile.repos;
            return(
                <>
                {/* Display Github profile */}
                <Container>
                    <h2>Git repositories</h2>
                    <Row>
                        <Col md="2">
                        
                            <ListGroup  variant="flush">
                                <h4><img src="./images/GitHub.png" height="30" className="d-inline-block align-top" alt="Github logo"/> GitHub Users</h4>
                                <div className="scrollTogg1 overflow-auto" id="xpCol">
                                {resultHub.map(item=>(
                                    <ListGroup.Item  variant="dark" action value={item.login}  onClick={e => {this.getHubProfile(e)} } >
                                        <Image  style={{ width: '2.5rem' }} roundedCircle src={item.avatar_url}></Image> {item.login} 
                                    </ListGroup.Item>
                                ))}
                                </div>
                            </ListGroup>
                            <br></br>
                            <ListGroup variant="flush">
                                <h4><img src="./images/gitlab.png"  height="30" className="d-inline-block align-top" alt="Gitlab logo"/> GitLab Users</h4>
                                <div className="scrollTogg1 overflow-auto" id="xpCol">
                                {resultLab.map(item=>(
                                    <ListGroup.Item  variant="warning" action value={item.id}  onClick={e => {this.getLabProfile(e)} } >
                                        <Image  style={{ width: '2.5rem' }} roundedCircle src={item.avatar_url}></Image> {item.username}
                                    </ListGroup.Item>
                                ))}
                               </div> 
                            </ListGroup>
                        </Col> 
                        <Col md="10">
                            <Row>
                                <Col md="3"className="bio">
                                    <Bio bioData = {bioData}/>
                                </Col>
                                <Col className="repo">
                                <h3>Top Repositories</h3>
                                    <Repo repoData ={repoData}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                </>
            )
        }
        else if(isLoadedLab == true){
            const bioData = this.state.labProfile.bio;
            const repoData = this.state.labProfile.repos;
            {/* Display Gitlab profile */}
            
            return(
                <>
                <Container >
                    <h2>Git repositories</h2>
                    <Row >
                        <Col md="2">
                            <ListGroup variant="flush">
                                <h4><img src="./images/GitHub.png" height="30" className="d-inline-block align-top" alt="Github logo"/> GitHub Users</h4>
                                <div className="scrollTogg1 overflow-auto" id="xpCol">
                                {resultHub.map(item=>(
                                    <ListGroup.Item  variant="dark" action value={item.login}  onClick={e => {this.getHubProfile(e)} } >
                                        <Image style={{ width: '2.5rem' }} roundedCircle src={item.avatar_url}></Image> {item.login} 
                                    </ListGroup.Item>
                                ))}
                               </div> 
                            </ListGroup>
                            <br></br>
                            <ListGroup  variant="flush">
                                <h4><img src="./images/gitlab.png"  height="30" className="d-inline-block align-top" alt="Gitlab logo"/> GitLab Users</h4>
                                <div className="scrollTogg1 overflow-auto" id="xpCol">
                                {resultLab.map(item=>(
                                    <ListGroup.Item  variant="warning" action value={item.id} onClick={e => {this.getLabProfile(e)} }>
                                        <Image  style={{ width: '2.5rem' }} roundedCircle src={item.avatar_url}></Image>{item.username}
                                    </ListGroup.Item>
                                ))}
                                </div>
                            </ListGroup>
                        </Col>   
                        <Col md="10">
                            <Row>
                                <Col md="3"className="bio">
                                    <Bio bioData = {bioData}/> 
                                </Col>
                                <Col className="repo">
                                <h3>Top Repositories</h3>
                                    <Repo repoData ={repoData}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                </>
            )
        }
        else{

        {/* Display welcome message before input is made */}  
        if (isLoadedHub == false && isLoadedLab == false){   
        return(
            <Container>
                <h2>Git repositories</h2>
            <Row>
                <Col md="2">
                    <ListGroup  variant="flush">
                        <h4><img src="./images/GitHub.png" height="30" className="d-inline-block align-top" alt="Github logo"/> GitHub Users</h4>
                        <div className="scrollTogg1 overflow-auto" id="xpCol">
                        {resultHub.map(item=>(
                            <ListGroup.Item  variant="dark" action value={item.login}  onClick={e => {this.getHubProfile(e)} }>
                                <Image  style={{ width: '2.5rem' }} roundedCircle src={item.avatar_url}></Image> {item.login} 
                            </ListGroup.Item>
                        ))}
                        </div>
                    </ListGroup>
                    <br></br>
                    <ListGroup variant="flush">
                        <h4><img src="./images/gitlab.png"  height="30" className="d-inline-block align-top" alt="Gitlab logo"/> GitLab Users</h4>
                        <div className="scrollTogg1 overflow-auto" id="xpCol">
                        {resultLab.map(item=>(
                            <ListGroup.Item  variant="warning" action value={item.id}   onClick={e => {this.getLabProfile(e)} } >
                                <Image  style={{ width: '2.5rem' }} roundedCircle src={item.avatar_url}></Image> {item.username}
                            </ListGroup.Item>
                            )
                        )}
                        </div>
                    </ListGroup>
                    
                </Col>
                    
                <Col md="10">
                    <Row>
                        <Col md="3"className="bio">
                            
                        </Col>
                        <Col className="repo">
                            <h3>Welcome Git Repository Search App</h3>
                            <p>Search your for users on both Github and GitLab</p>
                        </Col>
                    </Row>

                </Col>
            </Row>
           
            </Container>
        )
        
    }
    
    else{
        return <div>Error: {error.message}</div>;
    }
        }
    }
}

export default Results