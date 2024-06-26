import { React, useState, useEffect, useContext } from "react";
import { useQuery } from 'react-query';

import { AuthContext } from "../../shared/context/auth-context";

import { getListingsbyOwner } from "../api/listings";

import './MyListings.css';
import MyListingsList from "../components/MyListingsList";

const MyListings = () => {

const auth = useContext(AuthContext);

//If user isn't logged in return error

if (!auth.isLoggedIn) return (
  <>
    <div className="listings__page">An error has occurred:</div>
    <div>You are not logged in</div>
  </>
)
  
if (auth.isLoggedIn) {

//Render page content based on result of query

const { isLoading, error, data } = useQuery("listingsData", () =>getListingsbyOwner({owner: auth.userId, token: auth.token}));

  if (isLoading) return (
    <div className="listings__page">Loading listings...</div>
  );

  if (error) return (
    <>
      <div className="listings__page">An error has occurred:</div>
      <div>{error.message}</div>
    </>
  );

//If user has no listings

  if (data.length < 1) return (
    <div className="listings__page">
      <h1 className="my__listings__header">My listings</h1>
      <h2>You have no listings</h2>
    </div>
  )

//Show user's listings

  if (data.length > 0) return (
    <div className="listings__page">
      <h1 className="my__listings__header">My listings</h1>
      <MyListingsList items={data}/>
    </div>
  )

}

return (
  <></>
)

}

export default MyListings;
