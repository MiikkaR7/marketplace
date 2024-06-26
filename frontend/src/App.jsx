import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { useState, useEffect, useCallback } from 'react'
import { useAlert } from 'react-alert'

import { AuthContext } from './shared/context/auth-context';

import Navigation from './shared/navigation/Navigation';
import Listings from './listings/pages/Listings';
import AddListing from './listings/pages/AddListing';
import Authenticate from './users/pages/Authenticate';  
import MyListings from './listings/pages/MyListings';
import EditListing from './listings/pages/EditListing';

import './App.css'

function App() {

const queryClient = new QueryClient();
let logoutTimer;
const alert = useAlert();

//States for authorization and storage

const [token, setToken] = useState(false);
const [userId, setuser] = useState(false);
const [userName, setName] = useState(false);
const [tokenExpirationDate, setExpirationDate] = useState(false);

//Login callback function that stores users login information

const login = useCallback((uid, token, username, expirationDate) => {

  setName(username);
  setToken(token);
  setuser(uid);

  const tokenExpirationDate = 

  expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
  
  setExpirationDate(tokenExpirationDate);
  
  localStorage.setItem(
    'userData',
    JSON.stringify({
      userName: username,
      userId: uid, 
      token,
      expiration: tokenExpirationDate.toISOString()
    })
  )
}, []);

//Logout function that removes local storage and clears states

const logout = useCallback(() => {

  alert.show('SUCCESSFULLY LOGGED OUT', {type: 'success'});

  setToken(null);
  setuser(null);
  setName(null);
  setExpirationDate(null);

  localStorage.removeItem('userData');

}, []);

//useEffects for logging in user with local storage and timing user out

useEffect(() => {

  const storedData = JSON.parse(localStorage.getItem('userData'));
    
  if (storedData && storedData.token &&

    new Date(storedData.expiration) > new Date()

  ) {

    login(storedData.userId, storedData.token, storedData.userName, new Date(storedData.expiration));

  }

}, [login]);

useEffect(() => {

  if(token && tokenExpirationDate) {

    const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()

    logoutTimer = setTimeout(logout, remainingTime);

  } else {

    clearTimeout(logoutTimer);

  }

}, [token, tokenExpirationDate, logout]);

//Routes

let routes;

routes = (
  <Routes>
    <Route path="/" element={<Listings />} />
    <Route path="/mylistings" element={<MyListings />} />
    <Route path="/listings/new" element={<AddListing />} />
    <Route path="/auth" element={<Authenticate />} />
    <Route path="/listings/:id" element={<EditListing />}/>
    <Route path="/" render={() => <Redirect to="/" />} />
  </Routes>
); 

return (
<AuthContext.Provider
  value={{ 
    isLoggedIn: !!token,
    userName: userName, 
    token: token, 
    userId: userId, 
    login: login, 
    logout: logout
  }}
>
  <QueryClientProvider client={queryClient}>
    <Router>
      <Navigation/>
        <main>
        {routes}
        </main>
    </Router>
  </QueryClientProvider>
</AuthContext.Provider>
)

}

export default App;
