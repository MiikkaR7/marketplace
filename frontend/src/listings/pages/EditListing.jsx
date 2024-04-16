import React from "react";
import { useRef, useContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";

import { updateListing } from "../api/listings";
import { getListingById } from "../api/listings";
import { AuthContext } from "../../shared/context/auth-context";

import './EditListing.css';

const EditListing = (props) => {

  let navigate = useNavigate();

  const toMyListings = () => {
    navigate('/mylistings')
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

  console.log("handle " + id);

  useEffect(() => {

    async function getData() {
      const res = await getListingById(id);
      setlistingData(res);
    }
    getData();
  }, []);

  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  const auth = useContext(AuthContext);

  const updateListingMutation = useMutation({
    mutationFn: updateListing
  });

  const ListingSubmitHandler = async event => {
    event.preventDefault();
    updateListingMutation.mutate({
      id: id,
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      token: auth.token
    })

    //force page to refresh with invalid request(maybe better approach?)
    await updateListing(id);
    navigate('/');
  };

  return (
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
};
export default EditListing;