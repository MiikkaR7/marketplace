[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/qCtVf2Dd)
# Final Project - Miikka Riipi
Web Programming - Final Project

Service is running on Render at https://two024-final-project-miikkar7-frontend.onrender.com/

Running locally
1. Clone the repository to your machine
2. Run `npm install` to install packages & dependencies
3. `cd` into /backend and create an ENV file containing the following lines:
```
PORT=5030  
MYSQL_HOST=127.0.0.1  
MYSQL_USER=root  
MYSQL_PASSWORD=listingspw  
MYSQL_DATABASE=listings_db  
MYSQL_PORT=3306  
JWT_KEY=my_listings_secret_key  
```
4. `cd` into /frontend and create an ENV file containing the following line:
```
VITE_API_URL=http://localhost:5030    
```
5. Run `docker-compose up` in root directory to start up the database
6. Run `npm run dev` in /frontend and /backend to start the services respectively
7. Application should then be running on http://localhost:5172

## Documentation

### Technologies / stack

The project is based on the practice project and thus uses the same stack.
Node.js - Express backend
React - Vite frontend
mySQL database
Backend tests with jest + supertest libraries
Project uses the Git feature branching strategy
Github actions for automated tests for feature branches and deployment to server when merged to main (production)

### Use cases

The marketplace application allows users to create an account, log in to said account and afterwards create listings for items to sell. Listings include a name, price, description, image link (image), owner id (owner) and owner name (displayname). The user can set the first 4 (name, price, description, image). Any user can view all listings and an individual listing by clicking on it. Logged in users can in addition view their own listings and edit them. Listing owners can of course also delete their listings. Any user can also search for listings based on their name on the all listings page. The site has navigation based on the practice project implementation, but using react-router-v6 instead of v5. The application has error handling on both the backend and frontend. On the frontend, the user gets feedback from invalid inputs through alerts using reacts useAlert library.

### Difficulties

Some of the additional features when compared to the practice project were a bit involved to implement. To implement a search functionality, the backend model had a very strict syntax to look for given string inside another, which took way too long to figure out. The react alerts were also surprisingly involved to set up. In the application, the mutation functions did not seem to want to enter their error clauses, instead always returning success despite getting an error. To combat this, checks for erroneous behaviour had to be implemented in the success clauses. This was done to display error alerts to the user when for example trying to create an account with an email already in use.

The most difficult part in deploying was trying to find a service to host the mySQL database FOR FREE. Of course, the schools database service could have been used, but I assumed that database would be deleted along with the school credentials. Finally I found a service called Railway, which can host a mySQL database for free and allows connections to it from outside. 
