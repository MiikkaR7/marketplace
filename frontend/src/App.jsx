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

const queryClient = new QueryClient();

let logoutTimer;

function App() {


  const [token, setToken] = useState(false);
  const [userId, setuser] = useState(false);
  const [tokenExpirationDate, setExpirationDate] = useState(false);

  const alert = useAlert();

  
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setuser(uid);
  
    const tokenExpirationDate = 
    expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
  
    setExpirationDate(tokenExpirationDate);
  
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid, 
        token,
        expiration: tokenExpirationDate.toISOString()
      })
    )
  }, []);

  const logout = useCallback(() => {
    alert.show('SUCCESSFULLY LOGGED OUT', {type: 'success'});
    setToken(null);
    setuser(null);
    setExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    
    if (storedData && storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
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
            token: token, 
            userId: userId, 
            login: login, 
            logout: logout
        }}
        >
          <QueryClientProvider client={queryClient}>
            <Router>
              <Navigation />
              <main>
                {routes}
              </main>
            </Router>
          </QueryClientProvider>
        </AuthContext.Provider>
      );

}

export default App;
