//Listings API calls

//Get all listings

export const getAllListings = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/listings`
    );
    return await res.json();
  };

export const getListingById = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/listings/${id}`
    );
    return await res.json();
  };


//Get listings by owner for My listings -page

export const getListingsbyOwner = async ({owner, token}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings/mylistings/${owner}`, 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
  );
  return await res.json();
}

//Create listing

export const createListing = async ({name, price, description, image, owner, displayname, token}) => {
  console.log(name, price, description, image);
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings`, 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name,
        price,
        description,
        image,
        owner,
        displayname
      })
    }
  );
  return await res.json();
};

//Update listing

export const updateListing = async ({id, name, price, description, image, token}) => {
  console.log(id, name, price, description, image);
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings`, 
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        id,
        name,
        price,
        description,
        image
      })
    }
  );
  return await res.json();
};

//delete listing

export const deleteListingById = async ({id, user, token}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings/${user}/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })

    return await res.json();
};

//Search listings by name

export const findListingsByName = async (name) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings/search/${name}`
  );
  return await res.json();
};