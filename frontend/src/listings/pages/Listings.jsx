import { React, useState, useEffect } from "react";
import { useQuery } from 'react-query'

import { getAllListings } from "../api/listings";

import './Listings.css';
import ListingsList from "../components/ListingsList";

const Listings = () => {

    let Content;

    const { isLoading, error, data } = useQuery("listingsData", () =>getAllListings());

    if (isLoading) return (
    <h3 className="listings__page">Loading listings...</h3>
    );

    if (error) return (
        <div className="listings__page">
            <h2>Error fetching listings</h2>
        </div>
    )

    if (data.length < 1) return (
        <div className="listings__page">
          <h1 className="listings__header">All Marketplace listings</h1>
          <h3 className="listings__tip">Click on an item to see detailed information</h3>
          <h2>There are currently no listings</h2>
        </div>
    )
  
    if (data.length > 0) return (
      <div className="listings__page">
        <h1 className="listings__header">All Marketplace listings</h1>
        <h3 className="listings__tip">Click on an item to see detailed information</h3>
        <ListingsList items={data}/>
      </div>
  )

    Content = <ListingsList items={data}/>

    return (
    <></>
    )
}

export default Listings;