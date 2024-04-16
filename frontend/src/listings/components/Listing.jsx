import React, { useContext, useState, useEffect } from "react";

import ListingView from "../../shared/components/ListingView";
import Button from "../../shared/components/Button";
import ViewListingModal from "../../shared/components/ViewListingModal";

import { AuthContext } from "../../shared/context/auth-context";

import './Listing.css';

const Listing = props => {

  const [showListingModal, setListingModal] = useState(false);
  const hideListingHandler = () => setListingModal(false);

  const auth = useContext(AuthContext);

  const ListingClick = () => {
    setListingModal(true);
    console.log("Listing clicked");
  }

  return (

    <>
    <ViewListingModal className="listing__modal"  
        show={showListingModal}
        header={[props.name + ", ", props.price + " €"]} 
        description={"Description: " + props.description}
        img={props.image}
        onClick={hideListingHandler}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button >Add to Cart</Button>
          </React.Fragment>
        }
      ></ViewListingModal>

    <li className="listing__list" onClick={ListingClick}>
      <ListingView className="listing__view">
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
          </div>
        </div>
      </ListingView>
    </li>
    </>

  )
};
export default Listing;