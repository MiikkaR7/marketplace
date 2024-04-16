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

export const getListingsbyOwner = async ({owner, token}) => {
  console.log(owner);
  console.log(token);
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

export const createListing = async ({name, price, description, image, owner, token}) => {
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
        owner
      })
    }
  );
  return await res.json();
};

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

export const deleteListingById = async ({id, token}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })

    return await res.json();
};