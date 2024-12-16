# Twitter Clone

A feature-rich twitter clone, the stack is a Vue 3 frontend with Rails api backend, and PostgreSQL for database management.

## Starting up the UI

From the `twitter-ui`, first run `yarn` to install all the dependencies. Then
run `yarn dev` to startup the dev server.

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
