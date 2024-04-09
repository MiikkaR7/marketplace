import React, { useContext, useState, useEffect } from "react";



//import './Listing.css';

const ListingView = props => {

  return (
    <div className="listing__view">{props.children}</div>
  )
};
export default ListingView;