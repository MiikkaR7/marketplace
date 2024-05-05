import React from "react";
import { useRef, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import { AuthContext } from "../../shared/context/auth-context";

import { createListing } from "../api/listings";

import './AddListing.css';

const AddListing = () => {

const auth = useContext(AuthContext);
let navigate = useNavigate();
const alert = useAlert();

//Refs and functions for creating listing

const nameRef = useRef();
const priceRef = useRef();
const descriptionRef = useRef();
const imageRef = useRef();

const createListingMutation = useMutation({

    mutationFn: createListing,
    onSuccess:() => {
      alert.show('SUCCESSFULLY CREATED LISTING', {type: 'success'});
    },
    onError:() => {
      alert.show('ERROR CREATING LISTING', {type: 'error'});
    }

})

const ListingSubmitHandler = async event => {

  event.preventDefault();

  if (nameRef.current.value.length < 3) {
    alert.show('ERROR CREATING LISTING, CHECK NAME', {type: 'error'});
    return;
  }

  if (nameRef.current.value.length > 32) {
    alert.show('ERROR CREATING LISTING, NAME TOO LONG', {type: 'error'});
    return;
  }

  if (priceRef.current.value < 0.01) {
    alert.show('ERROR CREATING LISTING, CHECK PRICE', {type: 'error'});
    return;
  }

  if (descriptionRef.current.value.length < 1) {
    alert.show('ERROR CREATING LISTING, CHECK DESCRIPTION', {type: 'error'});
    return;
  }

  if (descriptionRef.current.value.length > 96) {
    alert.show('ERROR CREATING LISTING, DESCRIPTION TOO LONG', {type: 'error'});
    return;
  }

  if (imageRef.current.value.length < 1) {
    alert.show('ERROR CREATING LISTING, CHECK IMAGE', {type: 'error'});
    return;
  }

  createListingMutation.mutate({
    name: nameRef.current.value,
    price: priceRef.current.value,
    description: descriptionRef.current.value,
    image: imageRef.current.value,
    owner: auth.userId,
    displayname: auth.userName,
    token: auth.token
  })

  navigate('/');

}

//Prevent unauthorized users from creating listings

if (auth.isLoggedIn == false) return (
  <div className="add__listing__page">
    <p className="error__message">401 Unauthorized</p>
  </div>
)

if (auth.isLoggedIn == true) return (
  <div className="add__listing__page">
    <form className='listing__form' onSubmit={ListingSubmitHandler}>
      <Input id="name" ref={nameRef} type="text" label="Listing Title" />
      <Input id="price" ref={priceRef} type="number" min="0" step="0.01" label="Item Price"/>
      <Input id="description" ref={descriptionRef} type="text" label="Item Description"/>
      <Input id="image" ref={imageRef} type="text" label="Item Image"/>
      <Button id="add-listing">
      Submit Item
      </Button>
    </form>
  </div>
)

return (
  <></>
)

}

export default AddListing;
