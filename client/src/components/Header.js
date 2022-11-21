import React from "react";

import Container from 'react-bootstrap/Container';

function Header(){

    return(
        <header className='header-container'>
            <Container fluid>
                <h1>Git Repositories Search App</h1>
            </Container>
        </header>
    )
}

export default Header