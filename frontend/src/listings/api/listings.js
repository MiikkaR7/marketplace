export const getAllListings = async () => {
    const res = await fetch(
      `http://localhost:5030/api/listings`
    );
    return await res.json();
  };