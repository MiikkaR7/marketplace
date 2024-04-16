export const getAllListings = async () => {
    const res = await fetch(
      `http://localhost:5030/api/listings`
    );
    return await res.json();
  };

export const getListingById = async (id) => {
    const res = await fetch(
      `http://localhost:5030/api/listings/${id}`
    );
    return await res.json();
  };

export const getListingsbyOwner = async ({owner, token}) => {
  console.log(owner);
  console.log(token);
  const res = await fetch(
    `http://localhost:5030/api/listings/mylistings/${owner}`, 
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

export const updateListing = async ({id, name, price, description, image, token}) => {
  console.log(id, name, price, description, image);
  const res = await fetch(
    `http://localhost:5030/api/listings`, 
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