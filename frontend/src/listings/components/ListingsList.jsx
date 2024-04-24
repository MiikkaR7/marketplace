import React from "react";
import Listing from './Listing';
import './ListingsList.css';

const ListingsList = props => {
  return <ul className="listings__list">
    {props.items.map(listing => 
      <Listing
        id={listing.id} 
        key={listing.id}
        name={listing.name}
        price={listing.price}
        description={listing.description}
        image={listing.image}
        owner={listing.owner}
        displayname={listing.displayname}
      />
    )}
    </ul>
};
export default ListingsList;