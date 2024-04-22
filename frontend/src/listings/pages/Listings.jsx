import { React, useState, useEffect } from "react";
import { useQuery } from 'react-query'

import { getAllListings, findListingsByName } from "../api/listings";

import './Listings.css';
import ListingsList from "../components/ListingsList";
import Button from "../../shared/components/Button";

const Listings = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchState, setSearchState] = useState(false);
  const [statusMessage, setMessage] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch =  async () => {

    console.log(searchTerm);

        let response = await findListingsByName(searchTerm);

        if (response.length > 0) {
          setSearchResults(response);
          setSearchState(true);
          setMessage("Found " + response.length + " result(s)");
        } else {

      console.log("Error handling behavior");
      setMessage("No results for search " + `\"${searchTerm}\"`);

    }
      
  }

  const clearSearch = () => {
    setSearchState(false);
    setSearchTerm('');
    setMessage('');
  }

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
          <input
            className="search__bar"
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleChange}
          />
          <h2>There are currently no listings</h2>
        </div>
    )
  

    if (data.length > 1 && searchState == true) return (
      <div className="listings__page">
        <h1 className="listings__header">All Marketplace listings</h1>
        <h3 className="listings__tip">Click on an item to see detailed information</h3>
        <input
            className="search__bar"
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={clearSearch}>Clear</Button>
        <p className="status__message">{statusMessage}</p>
        <ListingsList items={searchResults}/>
      </div>
    )
  
    if (data.length > 0 && searchState == false) return (
      <div className="listings__page">
        <h1 className="listings__header">All Marketplace listings</h1>
        <h3 className="listings__tip">Click on an item to see detailed information</h3>
        <input
            className="search__bar"
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={clearSearch}>Clear</Button>
        <p className="status__message">{statusMessage}</p>
        <ListingsList items={data}/>
      </div>
  )

    return (
    <></>
    )
}

export default Listings;