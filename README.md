# Tourn

Tourn is an online tournament organizer for eSports. It is meant as a clone of websites such as challonge.com and smash.gg. 

## Table of Contents
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Sources](#sources)

## Technologies
#### Frontend
- [React.js](https://reactjs.org/)
- [Redux](https://redux.js.org/basics/usage-with-react)
- [Semantic UI (React)](https://react.semantic-ui.com/)

#### Backend
- [Ruby on Rails](https://rubyonrails.org/)
- ActiveRecord
- PostgreSQL

## Setup
To run this project locally, install it using yarn:

```
$ npm install
$ npm start
```

You will need to also clone the backend repo, change directory into it, and run the following code:

```
$ bundle install
$ rails db:create
$ rails db:migrate
$ rails db:seed
$ rails s
```

## Features
- Create an account
- Form a team
- Search for tournaments by name
- Have your team join a tournament 
- Host a tournament

## Sources
This project was bootstrapped with [create-react-app](https://facebook.github.io/create-react-app/docs/getting-started).
