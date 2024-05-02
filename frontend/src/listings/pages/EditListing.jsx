import React from "react";
import { useRef, useContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import { AuthContext } from "../../shared/context/auth-context";

import { updateListing } from "../api/listings";
import { getListingById } from "../api/listings";

import './EditListing.css';

const EditListing = () => {

const auth = useContext(AuthContext);
let navigate = useNavigate();
const alert = useAlert();

let Content;

//Shortcut to My listings -page

const toMyListings = () => {

  navigate('/mylistings');

}

//Default values for editing to prevent errors

const [listingData, setlistingData] = useState(
  [
    {
      name: "",
      price: "",
      description: "",
      image: ""
    }
  ]
);

let { id } = useParams();

//Get values for placeholders from selected listing

useEffect(() => {

  async function getData() {
    const res = await getListingById(id);
    setlistingData(res);
  }
  getData();
}, []);

//Refs for editing

const nameRef = useRef();
const priceRef = useRef();
const descriptionRef = useRef();
const imageRef = useRef();

const updateListingMutation = useMutation({

    mutationFn: updateListing,
    onSuccess:() => {
      alert.show('SUCCESSFULLY EDITED LISTING', {type: 'success'});
    },
    onError:() => {
      alert.show('ERROR EDITING LISTING', {type: 'error'});
    }

});

//Submit button functionality

const ListingSubmitHandler = async event => {

  event.preventDefault();

  //Input validation

  if (nameRef.current.value.length < 3) {
    alert.show('ERROR EDITING LISTING, CHECK NAME', {type: 'error'});
    return;
  }

  if (priceRef.current.value < 0.01) {
    alert.show('ERROR EDITING LISTING, CHECK PRICE', {type: 'error'});
    return;
  }

  if (descriptionRef.current.value.length < 1) {
    alert.show('ERROR EDITING LISTING, CHECK DESCRIPTION', {type: 'error'});
    return;
  }

  if (imageRef.current.value.length < 1) {
    alert.show('ERROR EDITING LISTING, CHECK IMAGE', {type: 'error'});
    return;
  }

  updateListingMutation.mutate({
    id: id,
    name: nameRef.current.value,
    price: priceRef.current.value,
    description: descriptionRef.current.value,
    image: imageRef.current.value,
    token: auth.token
  })

  navigate('/');

};

//Prevent unauthorized users from editing listings

if (auth.isLoggedIn == false || auth.userId != listingData.owner) return (
  <div className="edit__page">
    <p className="error__message">401 Unauthorized</p>
  </div>
)

if (auth.isLoggedIn == true && auth.userId == listingData.owner) return (
  <div className="edit__page">
    <form className='listing__form' onSubmit={ListingSubmitHandler}>
      <Input id="name" ref={nameRef} defaultValue={listingData.name} type="text" label="Listing Name" />
      <Input id="price" ref={priceRef} defaultValue={listingData.price} type="number" min="0" step="0.01" label="Listing Price"/>
      <Input id="description" ref={descriptionRef} defaultValue={listingData.description} type="text" label="Listing Description"/>
      <Input id="image" ref={imageRef} defaultValue={listingData.image} type="text" label="Listing Image"/>
      <Button type="submit">
      Submit Edits
      </Button>
      <Button danger onClick={toMyListings}>
      Cancel
      </Button>
    </form>
  </div>
)

return (
  <></>
)

}

export default EditListing;