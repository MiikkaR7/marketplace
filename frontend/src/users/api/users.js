export const logInUser = async ({email, password}) => {
    const response = await fetch('http://localhost:5030/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return await response.json();
}

export const signUpUser = async ({name, email, password}) => {
    const response = await fetch('http://localhost:5030/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    return await response.json();
}