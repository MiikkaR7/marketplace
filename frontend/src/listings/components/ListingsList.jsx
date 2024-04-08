import React from "react";
import Listing from './Listing';
//import './ListingsList.css';
const ListingsList = props => {
  return <ul className="listings-list">
    {props.items.map(listing => 
      <Listing
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
export default ListingsList;