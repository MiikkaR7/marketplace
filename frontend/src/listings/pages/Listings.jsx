import { React, useState, useEffect } from "react";
import { useQuery } from 'react-query'

import { getAllListings } from "../api/listings";

import './Listings.css';
import ListingsList from "../components/ListingsList";

const Listings = () => {

    let Content;

    const { isLoading, error, data } = useQuery("listingsData", () =>getAllListings());

    if (isLoading) return (
    <div className="center">Loading listings...</div>
    );

    if (error) return "An error has occurred: " + error.message;

    Content = <ListingsList items={data}/>

    return (
        <>
            <h1 className="listings__header">All Marketplace listings</h1>
            <h3 className="listings__tip">Click on an item to see detailed information</h3>
            <div className="listings__page">{Content}</div>
        </>
    )
}

export default Listings;