import React, { useContext, useState, useEffect } from "react";

//import './Listing.css';

const Listing = props => {

  return (
  <li className="listing">
    <div className="listing__content">
      <div className="listing__image">
        <img src={props.image} alt={props.description} />
      </div>
      <div className="listing__info">
        <h3>{props.name} - {props.price} €</h3>
        <h4>{props.description}</h4>
      </div>
    </div>
  </li>
  )
};
export default Listing;