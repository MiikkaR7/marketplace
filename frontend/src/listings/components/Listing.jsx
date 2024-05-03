import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useAlert } from "react-alert";

import ListingView from "../../shared/components/ListingView";
import Button from "../../shared/components/Button";
import Modal from "../../shared/components/Modal";
import ViewListingModal from "../../shared/components/ViewListingModal";
import { AuthContext } from "../../shared/context/auth-context";

import { deleteListingById } from "../api/listings";

import './Listing.css';

const Listing = (props) => {

let navigate = useNavigate(); 
const auth = useContext(AuthContext);
const alert = useAlert();

//States and functions to show and hide listing modals

const [showListingModal, setListingModal] = useState(false);
const [showConfirmationModal, setConfirmationModal] = useState(false);

const hideListingHandler = () => setListingModal(false);

const cancelConfirmationHandler = () => setConfirmationModal(false);

const DeleteButtonHandler = () => {
  setListingModal(false);
  setConfirmationModal(true);
}

const ListingClickHandler = () => {

  if (setConfirmationModal == true) {
    setListingModal(false);
  } else {
    setListingModal(true);
  }

}

const toUpdatePage = () => {

  navigate("/listings/" + props.id);

}

//Delete functionality

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

  <ViewListingModal className="listing__modal"  
    show={showListingModal}
    header={[props.name + ", ", props.price + " €"]} 
    description={props.description}
    img={props.image}
    displayname={props.displayname}
    onClick={hideListingHandler}
    footerClass="place-item__modal-actions"
    footer={
      <React.Fragment>
        {(auth.isLoggedIn && auth.userId != props.owner)
          ? <Button>Add to Cart</Button>
          : <p>Cannot purchase, check that you are logged in and not viewing your own listing</p>
          } 
      </React.Fragment>
    }
    >
  </ViewListingModal>

  <li className="listing__list">
    <ListingView className="listing__view">
      <div className="listing__content" onClick={ListingClickHandler}>
        <div className="listing__image">
          <img src={props.image} alt={props.description}/>
            <p className="listing__price">{props.price} €</p>
        </div>
        <div className="listing__info">
          <p className="listing__info__name">{props.name}</p>
        </div>
      </div>
      <div className="listing__buttons">
        {auth.userId == props.owner && (
        <Button onClick={toUpdatePage}>Edit</Button>
        )}
        {auth.userId == props.owner && (
        <Button danger onClick={DeleteButtonHandler}>Delete</Button>
        )}
      </div>
    </ListingView>
  </li>
</>
)

}

export default Listing;