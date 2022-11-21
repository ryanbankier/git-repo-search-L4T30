// import required modules
const express = require('express')
const helmet = require("helmet");
const fs = require('fs')
const app = express()
app.use(helmet());
// .env module
require('dotenv').config();

// env variables
const PORT = process.env.PORT;
const GH_ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN;
const GL_ACCESS_TOKEN = process.env.GL_ACCESS_TOKEN;

// required to use fetch api on node server
const fetch = require('node-fetch');

// required to query github api
const { Octokit, App } = require("octokit");
// authentication for github api
const octokit = new Octokit({
    auth: GH_ACCESS_TOKEN
});

// allows server to receive data from client
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// global variable for all search api calls
let searchTerm ='';

//Search github users using Api 
app.post('/github/search', (req, res) => {
    
    //input name from client
    searchTerm = req.body.name;
    
    // api call
    async function gitHubCall() {

        
        const result = await octokit.request('GET /search/users{?q,per_page}', {
                        // query results parameters
                       q: `${searchTerm} in:name created:<2022-01-01 type:user`,
                        per_page: 20
                        });
        // return result to client                
        res.json(result.data);
    }
    gitHubCall()
})

// get github user profile using api
app.post("/github/profile", (req, res) =>{

    // selected name from client
    const name = req.body.name;

    // api call
    async function gitHubProfile(){
        const result = await octokit.request('GET /users/{username}', {
                username: name
             });
        // repos are requested by newsest in descending order
        const repo = await octokit.request('GET /users/{username}/repos{?sort,direction,per_page}', {
                username: name,
                sort: "created",
                direction: "desc",
                per_page:10
             });
        
        
        
        /*const commit = await octokit.request(`/repos/BracketCove/android-architecture/comments{?per_page}`, 
        {
            per_page:5
         });*/
        
        // store wanted result data
        const resData = result.data
        const repoData = repo.data
        
        // return data to client
        res.json({bio: resData, repos: repoData})

    }
    gitHubProfile()
})

app.post("/github/commit", (req, res) =>{

    // selected name from client
    const name = req.body.name;
    
    // api call
    async function gitHubCommit(){
        

        const commit = await octokit.request(`/repos/${name}/commits{?per_page}`, 
        {
            per_page:5
         });
        
        
        const commitDate = commit.data
        // return data to client
        res.json({data: commitDate})

    }
    gitHubCommit()
})

// get gitlab user profile using api
app.post('/gitlab/profile', (req, res) => {
    
    // user id received from client
    const id = req.body.id;

    // async function used to run to fetch api
    async function gitLabProfile(){

        // api request for user bio infomation
        const bio = await fetch(`https://gitlab.com/api/v4/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": GL_ACCESS_TOKEN
            }
        })
        .then(response => response.json());
        
        // api request for users repository infomation
        const repo = await fetch(`https://gitlab.com/api/v4/users/${id}/projects`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": GL_ACCESS_TOKEN
            }
        })
        .then(response => response.json())

        // return data back to client
        res.json({bio: bio, repos: repo})
    }
    gitLabProfile()
   
})

// fetches gitlab project commits
app.post('/gitlab/commit', (req, res) => {
    
    // user id received from client
    const id = req.body.id;

    // async function used to run to fetch api
    async function gitLabCommit(){

        // api request for user bio infomation
        const commit = await fetch(`https://gitlab.com/api/v4/projects/${id}/repository/commits`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": GL_ACCESS_TOKEN
            }
        })
        .then(response => response.json());

        // return data back to client
        res.json({data: commit})
        
        
    }
    gitLabCommit()
   
})

// search gitlab using api
app.post('/gitlab/search', (req, res) => {

    // input name receive from client
    searchTerm = req.body.name;

    // api call
    fetch(`https://gitlab.com/api/v4/search?scope=users&search=${searchTerm}&per_page=20`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": GL_ACCESS_TOKEN
        }
        
        })
        // parses response to JSON
        .then(response => response.json())
        // returns back message from server
        .then(
            (result) => {
                res.json(result);
                 
            },
            (error) => {
                console.log(error)
            }
        )
})


// listen appplies the port variable setting and listens for requests for set port
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    });