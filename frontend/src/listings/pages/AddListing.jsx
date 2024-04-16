import React from "react";
import { useRef, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";

import { createListing } from "../api/listings";
import { AuthContext } from "../../shared/context/auth-context";

import './AddListing.css';

const AddListing = () => {

  let navigate = useNavigate();

  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  const auth = useContext(AuthContext);

  const createListingMutation = useMutation({
    mutationFn: createListing
  });

  const ListingSubmitHandler = async event => {
    event.preventDefault();
    createListingMutation.mutate({
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      owner: auth.userId,
      token: auth.token
    })

    //force page to refresh with invalid request(maybe better approach?)
    await createListing(nameRef);
    navigate('/');
  };

  return (
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
};
export default AddListing;
