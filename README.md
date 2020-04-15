# Tourn

Tourn is an online tournament organizer for eSports. It is a reimagining of websites such as challonge.com and smash.gg. 

See the live demo at [https://tourn-tournaments.herokuapp.com/](https://tourn-tournaments.herokuapp.com/).

## Table of Contents
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Sources](#sources)

## Technologies
#### Frontend
[React.js](https://reactjs.org/), [Redux](https://redux.js.org/basics/usage-with-react), [Semantic UI (React)](https://react.semantic-ui.com/)

#### Backend
[Ruby on Rails](https://rubyonrails.org/), ActiveRecord, PostgreSQL, JSON Web Tokens, BCrypt

## Setup
To run this project locally, install it using yarn:

```
$ npm install
$ npm start
```
Then go to PORT 3001 to get started.

You will need to also clone the backend repo, and run the following code on the backend project directory:

```
$ bundle install
$ rails db:create
$ rails db:migrate
$ rails db:seed
$ rails s
```
The backend server will run on Port 3000.

## Features
- Create an account
- Form a team
- Join a team
- Search for tournaments by name
- Have your team join a tournament 
- Host a tournament
- Create a tournament bracket

## Sources
This project was bootstrapped with [create-react-app](https://facebook.github.io/create-react-app/docs/getting-started).
