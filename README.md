# RoomMate App

An application to help roommates visualize the household chores.

## Getting Started

Clone this repo.

### Prerequisites

* npm
* postgres database
* git

### Installing

1. Navigate into the server directory of the cloned repo. 
```
$ cd roommateApp/server
```
2. Install the dependencies.
```
$ npm install
```
3. Edit knexfile.js to include the 'postgres://localhost/roommate_db' link. Create database and run the migrations.
```
$ createdb roommate_db
$ knex migrate:latest
```
4. Fire up the server!
```
$ npm start
```

## Built With 

* [Express](https://expressjs.com/) - Web framework for Node.js
* [PostgreSql](https://www.postgresql.org/) - Object-relational database
* [Knex.js](https://knexjs.org/) - SQL query builder
* [Bootstrap 4](https://getbootstrap.com/) - Front-end web framework
* [Axios](https://github.com/axios/axios) - Promise based HTTP client
* [Node.js](https://nodejs.org/) - JavaScript runtime

## Author

* **Mariya Mego Vela** 
 