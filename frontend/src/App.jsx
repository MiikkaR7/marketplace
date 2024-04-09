import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { useState, useCallback } from 'react'

import { AuthContext } from './shared/context/auth-context';

import Navigation from './shared/navigation/Navigation';
import Listings from './listings/pages/Listings';
import AddListing from './listings/pages/AddListing';
import Authenticate from './users/pages/Authenticate';  
import MyListings from './listings/pages/MyListings';

import './App.css'

const queryClient = new QueryClient();

function App() {


  const [token, setToken] = useState(false);
  const [userId, setuser] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setuser(uid);
  },[]);

  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
  },[]);


  let routes;

    routes = (
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/mylistings" element={<MyListings />} />
        <Route path="/listings/new" element={<AddListing />} />
        <Route path="/auth" element={<Authenticate />} />
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
