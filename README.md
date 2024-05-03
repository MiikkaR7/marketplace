[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/qCtVf2Dd)
# Final Project - Miikka Riipi
Web Programming - Final Project

Service is currently NOT running on VM at http://172.16.4.202:90/

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
