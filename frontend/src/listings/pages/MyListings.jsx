import { React, useState, useEffect, useContext } from "react";
import { useQuery } from 'react-query';

import { AuthContext } from "../../shared/context/auth-context";

import { getListingsbyOwner } from "../api/listings";

import './Listings.css';
import MyListingsList from "../components/MyListingsList";

const MyListings = () => {

const auth = useContext(AuthContext);

let Content;

const storedData = JSON.parse(localStorage.getItem('userData'));

if (!storedData) {
    Content = "User data not found in localStorage";
  } else {
    const { userId, token } = storedData;


  console.log("Authenticated user:" + auth.userId, auth.token);

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