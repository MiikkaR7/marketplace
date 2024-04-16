import React, { useContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import ListingView from "../../shared/components/ListingView";
import Button from "../../shared/components/Button";
import { AuthContext } from "../../shared/context/auth-context";
import Modal from "../../shared/components/Modal";

import { deleteListingById } from "../api/listings";

import './MyListing.css';


const MyListing = props => {

let navigate = useNavigate();

const auth = useContext(AuthContext);

const [showConfirmationModal, setConfirmationModal] = useState(false);
const showConfirmationHandler = () => setConfirmationModal(true);
const cancelConfirmationHandler = () => setConfirmationModal(false);

const deleteListingMutation = useMutation({
  mutationFn: deleteListingById,
  onSuccess: (data) => {
    console.log(data);
  },
  onError: (error) => {
    console.log(error);
  }
})

const deleteConfirmedHandler = () => {
  setConfirmationModal(false);
  deleteListingMutation.mutate({
    id: props.id,
    token: auth.token
  })
  console.log("Deleted listing with id" + props.id);
  navigate(0);
};

  const toUpdatePage = () => {
    console.log();
    navigate("/listings/" + props.id);
  }

useEffect(() => {

}, [deleteConfirmedHandler]);

  return (

    <>
    <Modal  
        show={showConfirmationModal}
        header="Are you sure?" 
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={cancelConfirmationHandler}>Cancel</Button>
            <Button danger onClick={deleteConfirmedHandler}>Delete</Button>
          </React.Fragment>
        }
      >
        <p>Are you sure? Once it's gone, it's gone!</p>
    </Modal>

    <li className="listing__list">
      <ListingView className="my__listing__view">
        <div className="listing__content">
          <div className="listing__image">
            <img src={props.image} alt={props.description} />
            <div className="listing__price">
              <h3>{props.price} €</h3>
            </div>
          </div>
          <div className="listing__info">
            <h2>{props.name}</h2>
          </div>
          <div className="listing__buttons">
            <Button onClick={toUpdatePage}>Edit</Button>
            <Button id="delete-button" danger onClick={showConfirmationHandler}>Delete</Button>
          </div>
        </div>
      </ListingView>
    </li>
    </>

  )
};
export default MyListing;