import React, { useContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import ListingView from "../../shared/components/ListingView";
import Button from "../../shared/components/Button";
import { AuthContext } from "../../shared/context/auth-context";
import Modal from "../../shared/components/Modal";

import { deleteListingById } from "../api/listings";

import './MyListing.css';


const MyListing = (props) => {

let navigate = useNavigate();
const alert = useAlert();
const auth = useContext(AuthContext);

//States for showing modals

const [showConfirmationModal, setConfirmationModal] = useState(false);
const showConfirmationHandler = () => setConfirmationModal(true);
const cancelConfirmationHandler = () => setConfirmationModal(false);

//Delete listing functions

const deleteListingMutation = useMutation({
  mutationFn: deleteListingById,
  onSuccess: (data) => {
    console.log(data);
    alert.show('SUCCESSFULLY DELETED LISTING', {type: 'success'});
  },
  onError: (error) => {
    console.log(error);
    alert.show('COULD NOT DELETE LISTING', {type: 'error'});
  }
})

const deleteConfirmedHandler = () => {

  setConfirmationModal(false);

  deleteListingMutation.mutate({
    id: props.id,
    user: auth.userId,
    token: auth.token
  })

}

//Edit button functionality

const toUpdatePage = () => {

  navigate("/listings/" + props.id);

}

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

  <li className="my__listing__list">
    <ListingView className="my__listing__view">
      <div className="my__listing__content">
        <div className="my__listing__image">
          <img src={props.image} alt={props.description} />
          <p className="my__listing__price">{props.price} €</p>
        </div>
        <div className="my__listing__info">
          <p className="my__listing__info__name">{props.name}</p>
        </div>
        <div className="my__listing__buttons">
          <Button onClick={toUpdatePage}>Edit</Button>
          <Button id="delete-button" danger onClick={showConfirmationHandler}>Delete</Button>
        </div>
      </div>
    </ListingView>
  </li>
</>
)

}

export default MyListing;