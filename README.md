# Twitter Clone

A feature-rich twitter clone built with Vue 3 + Typescript for the frontend, a Rails REST API backend that uses PostgreSQL for database management.

## Setting up the UI

Please do the following:

1. `cd` into the `twitter-ui` folder
2. Run `yarn` or `npm install` to install dependencies
3. Run `yarn dev` to start up the vue dev server

## Setting up the API

Before starting please make sure you have **postgesql** installed on your machine. After that cd into the `twitter-api` folder and do the following:

1. Run `bundle install` to install dependencies
2. Then run `rails db:migrate` to
3. Then run `rails s` to
   startup the dev server.

## Starting it all up with Docker compose

You can also get this project up and running with Docker Compose, with Docker installed at the root of this project run the following command:

```
docker compose up --build
```

## Features :sparkles:
- User signup flow
- JWT user authentication
- Forgot password flow 
- Tweet posting with images
- Tweet liking
- Tweet retweeting
- Tweet bookmarking
- Followers and followings
- Tweet feed
- Profile tweets lists for default, retweeted, media, and liked
