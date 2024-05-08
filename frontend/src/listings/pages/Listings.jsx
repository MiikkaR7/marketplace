import { React, useState, useEffect } from "react";
import { useQuery } from 'react-query'

import { getAllListings, findListingsByName } from "../api/listings";

import './Listings.css';
import ListingsList from "../components/ListingsList";
import Button from "../../shared/components/Button";

const Listings = () => {

//States for search and user feedback

const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [searchState, setSearchState] = useState(false);
const [statusMessage, setMessage] = useState('');

//Set search term equal to input fields' value

const handleSearchChange = (event) => {

  setSearchTerm(event.target.value);

}

//Use search API call and save results

const handleSearch =  async () => {

  setMessage('');
  let response = await findListingsByName(searchTerm);

  if (response.length > 0 && searchTerm != '') {

    setSearchResults(response);
    setSearchState(true);
    setMessage('Found ' + response.length + ' results');

  } else {

    if (searchTerm == '') {

      setMessage('Enter name of listing to search')

    } else {

    setMessage("No results for search " + `\"${searchTerm}\"`);

    }

  }
      
}

//Clear search and status message

const clearSearch = () => {

  setSearchState(false);
  setSearchTerm('');
  setMessage('');

}

//Render page content based on result of query

const { isLoading, error, data } = useQuery("listingsData", () =>getAllListings());

  if (isLoading) return (
  <h3 className="listings__page">Loading listings...</h3>
  )

  if (error) return (
    <div className="listings__page">
      <h2>Error fetching listings</h2>
    </div>
  )

//If no listings exist

  if (data.length < 1) return (
    <div className="listings__page">
      <h1 className="listings__header">All Marketplace listings</h1>
      <h3 className="listings__tip">Click on an item to see detailed information</h3>
      <h3 className="listings__tip__2">Log in to purchase and add listings</h3>
      <input
        className="search__bar"
        type="text"
        placeholder="Search listings..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <h2>There are currently no listings</h2>
    </div>
  )

//If listings exist and search is in use
  
  if (data.length > 0 && searchState == true) return (
    <div className="listings__page">
      <h1 className="listings__header">All Marketplace listings</h1>
      <h3 className="listings__tip">Click on an item to see detailed information</h3>
      <h3 className="listings__tip__2">Log in to purchase and add listings</h3>
      <div className="search__element">
          <input
            className="search__bar"
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="search__buttons">
          <Button onClick={handleSearch}>Search</Button>
          <Button onClick={clearSearch}>Clear</Button>
          </div>
      </div>
      <p className="status__message">{statusMessage}</p>
      <ListingsList items={searchResults}/>
    </div>
  )


//If listings exist and search is not in use

  if (data.length > 0 && searchState == true) return (
      <div className="listings__page">
        <h1 className="listings__header">All Marketplace listings</h1>
        <h3 className="listings__tip">Click on an item to see detailed information</h3>
        <h3 className="listings__tip__2">Log in to purchase and add listings</h3>
        <div className="search__element">
          <input
            className="search__bar"
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="search__buttons">
          <Button onClick={handleSearch}>Search</Button>
          <Button onClick={clearSearch}>Clear</Button>
          </div>
      </div>
        <p className="status__message">{statusMessage}</p>
        <ListingsList items={searchResults}/>
      </div>
    )
  
  if (data.length > 0 && searchState == false) return (
    <div className="listings__page">
      <h1 className="listings__header">All Marketplace listings</h1>
      <h3 className="listings__tip">Click on an item to see detailed information</h3>
      <h3 className="listings__tip__2">Log in to purchase and add listings</h3>
      <div className="search__element">
          <input
            className="search__bar"
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="search__buttons">
          <Button onClick={handleSearch}>Search</Button>
          <Button onClick={clearSearch}>Clear</Button>
          </div>
      </div>
      <p className="status__message">{statusMessage}</p>
      <ListingsList items={data}/>
    </div>
  )

return (
<></>
)

}

export default Listings;
