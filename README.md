<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Wallet-Challenge

## Description

It is a small project that simulates some actions of a virtual wallet, created with Nestjs.
## Installation

```bash
$ npm install
```

## Running the app
### First, create the database, in this project it can be done with docker.

```bash
$ docker-compose up
```
### Second, run the migrations so that the tables are created in the database.

```bash
$ npm run migration:generate 'first-migration'

$ npm run migration:run 
```
### Third, once the migrations are finished, the project can be lifted with:

```bash
$ npm run start:dev
```
## Later

- The services are exposed through a documentation with swagger in the endpoint:
```
  localhost:3115/docs/#/
```
- The endpoint `/mock` indicated in the ***Create Mock!*** Tag must be run.

- A ***.env*** file must be created with the environment variables from the ***.env.example***.
