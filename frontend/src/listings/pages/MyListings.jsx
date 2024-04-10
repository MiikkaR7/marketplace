import { React, useState, useEffect, useContext } from "react";
import { useQuery } from 'react-query';

import { AuthContext } from "../../shared/context/auth-context";

import { getAllListings } from "../api/listings";

import './Listings.css';
import ListingsList from "../components/ListingsList";

const MyListings = () => {

    const auth = useContext(AuthContext);

    let Content;

    const { isLoading, error, data } = useQuery("listingsData", () =>getAllListings());

    if (isLoading) return (
    <div className="center">Loading listings...</div>
    );

    if (error) return "An error has occurred: " + error.message;

    Content = <ListingsList items={data}/>

    console.log(auth.userId);

    return (
        <>
            <h1 className="my__listings__header">My listings</h1>
            <div>{Content}</div>
        </>
    )
}

export default MyListings;