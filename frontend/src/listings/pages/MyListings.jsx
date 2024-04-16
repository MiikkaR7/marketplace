import { React, useState, useEffect, useContext } from "react";
import { useQuery } from 'react-query';

import { AuthContext } from "../../shared/context/auth-context";

import { getListingsbyOwner } from "../api/listings";

import './MyListings.css';
import MyListingsList from "../components/MyListingsList";

const MyListings = () => {

const auth = useContext(AuthContext);

let Content;

const storedData = JSON.parse(localStorage.getItem('userData'));

if (!storedData) {
    Content = "You are not logged in";
  } else {
    const { userId, token } = storedData;


  const { isLoading, error, data } = useQuery("listingsData", () =>getListingsbyOwner({owner: userId, token: token}));

    if (isLoading) return (
    <div className="listings-page">Loading listings...</div>
    );

    if (error) return (
        <>
            <div className="listings-page">An error has occurred:</div>
            <div>{error.message}</div>
        </>
    );

    Content = <MyListingsList items={data}/>

  }

  return (
    <div className="listings-page">
        <h1 className="my__listings__header">My listings</h1>
        <div>{Content}</div>
    </div>
    )

}



export default MyListings;