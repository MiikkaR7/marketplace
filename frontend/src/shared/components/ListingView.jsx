import React, { useContext, useState, useEffect } from "react";

import './ListingView.css';

const ListingView = props => {

  return (
    <div className={`listing__view ${props.className}`} style={props.style}>{props.children}</div>
  )
};
export default ListingView;