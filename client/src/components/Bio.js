// profile component displays all personal information
import React from 'react';

import Button from 'react-bootstrap/Button'

// Bio component function
function Bio (props){
    const bioData = props.bioData;
    // if statement displays info based on which git repo is selected github or gitlab
    if (bioData.hasOwnProperty('login')){
        // github view
        return (
            <div className='cotainer-fluid'>
                <img className='rounded-circle img-thumbnail profile-pic' src={bioData.avatar_url} ></img>
                <h2>{bioData.login}</h2>
                <h5 className='subtext'>{bioData.name}</h5>
                <h4>Bio</h4>
                <p>{bioData.bio}</p>
                <h4>Location</h4>
                <p>{bioData.location}<br></br>
                <h4>Email</h4>
                {bioData.email}<br></br>
                <Button variant="outline-secondary" target="_blank" href={bioData.html_url}><img src="./images/GitHub.png" width="30" height="30" className="d-inline-block align-top" alt="github logo"/> {bioData.login}</Button>
                </p>
            </div>  
        );
    }
    else if (bioData.hasOwnProperty('username')){
        // gitlab view
        return (
        <div className='cotainer-fluid'>
                <img className='rounded-circle img-thumbnail profile-pic' src={bioData.avatar_url} ></img>
                <h2>{bioData.username}</h2>
                <h5 className='subtext'>{bioData.name}</h5>
                <h4>Bio</h4>
                <p>{bioData.bio}</p>
                <h4>Location</h4>
                <p>{bioData.location}<br></br>
                <h4>Email</h4>
                {bioData.public_email}<br></br>
                <Button variant="outline-warning" target="_blank" href={bioData.web_url}><img src="./images/gitlab.png" width="30" height="30" className="d-inline-block align-top" alt="gitlab log"/> {bioData.username}</Button>
                </p>
            </div> 
        );
    }
    
    
}

//export Profile component so it can be imported into other components
export default Bio