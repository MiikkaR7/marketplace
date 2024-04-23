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
            alert.success('Sign up successful!');
            auth.login(data.id, data.token);
        },
        onError:(error) => {
            console.log(error)
        }
    });

    const logInUserMutation = useMutation({
        mutationFn: logInUser,
        onSuccess:(data) => {
            console.log(data);
            alert.success('Log in successful!');
            auth.login(data.id, data.token);
        },
        onError:(error) => {
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

        navigate('/');
    };


    return (
        <>
            <div className='authentication'>
                {!isLoginMode ? <h1>Sign Up</h1> : <h1>Login</h1>}
                <div className="auth__form">
                    <form className="auth__fields" onSubmit={onSubmitHandler}>
                        {!isLoginMode && <Input id="name" ref={nameRef} type="text" label="Name: "/>}
                        <Input id="email" ref={emailRef} type="text" label="Email Address: " />
                        <Input id="password" ref={passwordRef} type="password" label="Password: "/>
                    <div className="auth__buttons">
                        <Button id="formbutton" type="submit" disable={signUpUserMutation.isLoading}>{isLoginMode ? 'LOG IN' : 'SIGN UP'}</Button>
                    </div>
                    </form>
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