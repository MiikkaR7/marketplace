import React from "react";
import MyListing from './MyListing';
import './ListingsList.css';

const MyListingsList = props => {
  return <ul className="listings__list">
    {props.items.map(listing => 
      <MyListing
        id={listing.id} 
        key={listing.id}
        name={listing.name}
        price={listing.price}
        description={listing.description}
        image={listing.image}
      />
    )}
    </ul>
};
export default MyListingsList;