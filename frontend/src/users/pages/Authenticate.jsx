import { useRef, useState, useContext } from "react";
import { useMutation } from "react-query";

import { signUpUser, logInUser } from "../api/users";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";

import './Authenticate.css';

const Authenticate = () => {
    return (
        <>
            <div className='auth-page'>Authentication page</div>
        </>
    )
}

export default Authenticate;