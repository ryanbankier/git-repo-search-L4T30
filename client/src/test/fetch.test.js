// jest test: Test the fetch function is returing data
/**
 * @jest-environment-options {"url": "http://localhost:8080/gitlab/profile"}
 */
test ('tests profile fetch ' , () =>{
    const data = {id:2750686};
    return fetch(`http://localhost:8080/gitlab/profile`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
        .then (res => res.json())
        .then(data =>{
            expect(data).toHaveProperty('bio');
    });
    
    
    
});


    
    