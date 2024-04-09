import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from 'react'

import Navigation from './shared/navigation/Navigation';
import Listings from './listings/pages/Listings';
import AddListing from './listings/pages/AddListing';
import Authenticate from './users/pages/Authenticate';

import './App.css'

const queryClient = new QueryClient();

function App() {

  let routes;

    routes = (
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/listings/new" element={<AddListing />} />
        <Route path="/auth" element={<Authenticate />} />
        <Route path="/" render={() => <Redirect to="/" />} />
      </Routes>
    ); 

  return (
    
          <QueryClientProvider client={queryClient}>
            <Router>
              <Navigation />
              <main>
                {routes}
              </main>
            </Router>
          </QueryClientProvider>
      );

}

export default App;
