import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ListingView from "../../shared/components/ListingView";
import Button from "../../shared/components/Button";

import { AuthContext } from "../../shared/context/auth-context";

import './MyListing.css';

const MyListing = props => {

  const auth = useContext(AuthContext);

  let navigate = useNavigate();

  const toUpdatePage = () => {
    console.log();
    navigate("/listings/" + props.id);
  }

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
            <h2>{props.name}</h2>
          </div>
          <div className="listing__buttons">
            <Button onClick={toUpdatePage}>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        </div>
      </ListingView>
    </li>

  )
};
export default MyListing;