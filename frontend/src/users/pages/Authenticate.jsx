import { useRef, useState, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";

import { signUpUser, logInUser } from "../api/users";
import { AuthContext } from "../../shared/context/auth-context";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";

import './Authenticate.css';

const Authenticate = (props) => {

    let navigate = useNavigate();
    const alert = useAlert();
    const auth = useContext(AuthContext);

    const [isLoginMode, setLoginMode] = useState(true);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const switchModeHandler = () => {
        setLoginMode(prevMode => !prevMode);
    }

    const signUpUserMutation = useMutation({
        mutationFn: signUpUser,
        onSuccess:(data) => {

            console.log(data);

            if (data.message == 'Could not create user, user exists') {
                alert.show('ERROR SIGNING UP, EMAIL IN USE', {type: 'error'});

            } else {
                auth.login(data.id, data.token, data.name);
                navigate('/');
            }
        },
        onError:(error) => {
            alert.show('ERROR CREATING ACCOUNT', {type: 'error'});
            console.log(error)
        }
    });

    const logInUserMutation = useMutation({
        mutationFn: logInUser,
        onSuccess:(data) => {
            
            console.log(data);

            if (data.message == 'Could not identify user, credentials might be wrong' || data.message == 'Something went wrong with login') {
                alert.show('ERROR LOGGING IN', {type: 'error'});
            }

            else {
                alert.show('SUCCESSFULLY LOGGED IN!', {type: 'success'});
                auth.login(data.id, data.token, data.name);
                navigate('/');
            }
        },
        onError:(error) => {
            alert.show('ERROR LOGGING IN', {type: 'error'});
            console.log(error)
        }
    });

    const onSubmitHandler = async event => {
        event.preventDefault();
        console.log("Form submitted");
        if (isLoginMode) {
        console.log(emailRef.current.value, passwordRef.current.value)
        logInUserMutation.mutate({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })
        } else {
       console.log(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
       signUpUserMutation.mutate({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        admin: true
            })
        }
    };


    return (
        <>
            <div className='authentication'>
                {!isLoginMode ? <h1 className="auth__header">Sign Up</h1> : <h1 className="auth__header">Login</h1>}
                <div className="auth__form">
                    <form className="auth__fields" onSubmit={onSubmitHandler}>
                        {!isLoginMode && <Input id="name" ref={nameRef} type="text" label="Name: "/>}
                        <Input id="email" ref={emailRef} type="text" label="Email Address: " />
                        <Input id="password" ref={passwordRef} type="password" label="Password: "/>
                    <div className="auth__buttons">
                        <Button id="formbutton" type="submit" disable={signUpUserMutation.isLoading}>{isLoginMode ? 'LOG IN' : 'SIGN UP'}</Button>
                    </div>
                    </form>
                    {!isLoginMode && <p>DO NOT FORGET YOUR CREDENTIALS!</p>}
                    <div className="auth__switch">
                    <Button id="switchbutton" inverse onClick={switchModeHandler}>
                        {isLoginMode ? 'Sign up instead?' : 'Log in instead?'}
                    </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Authenticate;