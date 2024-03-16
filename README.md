# gp-pos-barman

A Graduation project for school

POS system for a restaurant, is a point of sale system in the form of a web application made with the ASP.Net and Next.js frameworks, where a waiter or a barman puts in what the customer ordered. Inputted food then gets sent into the kitchen in the app, where the chef sees what he needs to make, together with notes as what to omit or what rarity to make a steak.

This repository is a monorepo.

# Installation

You need Docker installed on your machine to run this project.

After you have installed Docker, create a .env file in the root of the project with the contents of the .env.example file.

Then run docker compose to start the project

```bash
docker compose up
```

# Frontend

Frontend is written using React in Typescript, while using mantine.dev for styling.

> The frontend runs on port 7000

# Backend

Backend is written using ASP.Net in C#. The backend is connected via zodios.

> The backend runs on port 7001

# Database

MariaDB is used for the database

> The database runs on port 7003 with PhpMyAdmin on port 7002

# Docker

The frontend, backend and database are all running inside Docker for easy deployment
