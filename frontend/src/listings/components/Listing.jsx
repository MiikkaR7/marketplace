import React, { useContext, useState, useEffect } from "react";

import ListingView from "../../shared/components/ListingView";

import './Listing.css';

const Listing = props => {

  return (

    <li className="listing__list">
      <ListingView className="listing__view">
        <div className="listing__content">
          <div className="listing__image">
            <img src={props.image} alt={props.description} />
            <div className="listing__price">
              <h3>{props.price} €</h3>
            </div>
          </div>
          <div className="listing__info">
            <h3>{props.name}</h3>
            <p>{props.description}</p>
          </div>
          <div className="listing__buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </ListingView>
    </li>

  )
};
export default Listing;