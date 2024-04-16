import { React, useState, useEffect, useContext } from "react";
import { useQuery } from 'react-query';

import { AuthContext } from "../../shared/context/auth-context";

import { getListingsbyOwner } from "../api/listings";

import './Listings.css';
import ListingsList from "../components/ListingsList";

const MyListings = () => {

const auth = useContext(AuthContext);
const [Data, setData] = useState('Your listings');

let Content;

const storedData = JSON.parse(localStorage.getItem('userData'));

if (!storedData) {
    Content = "User data not found in localStorage";
  } else {
    const { userId, token } = storedData;


  console.log("Authenticated user:" + auth.userId, auth.token);

  const { isLoading, error, data } = useQuery("listingsData", () =>getListingsbyOwner({owner: userId, token: token}));

    if (isLoading) return (
    <div className="center">Loading listings...</div>
    );

    if (error) return "An error has occurred: " + error.message;

    Content = <ListingsList items={data}/>

  }

  return (
    <>
        <h1 className="my__listings__header">My listings</h1>
        <div>{Content}</div>
    </>
    )

}



export default MyListings;