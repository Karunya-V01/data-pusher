# Data Pusher

## Overview
This is a **Node.js Express application** that receives JSON data for an account and forwards it to various destinations using webhook URLs.  
It includes authentication, authorization (role-based access), logging, rate limiting, and Swagger-based API documentation.

## Requirements
- Node.js v12 (or compatible with your Windows system)
- MongoDB Atlas (for database)
- npm (for package management)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd data-pusher

    Install dependencies:

npm install

Create a .env file in the project root and add the required environment variables:

PORT=5000
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-secret-key>

Start the server:

node src/app.js

The server will run at:

http://localhost:5000

API documentation is available via Swagger UI:

    http://localhost:5000/api-docs

Features

    User Authentication

        Signup, Login, and JWT-based authentication

        Admin users created by default during signup

        Only Admin can invite new users

    Role-based Access Control

        Admin:

            Full CRUD on Accounts, Destinations, Account Members

            Can create and delete users

            Can read logs

        Normal User:

            Read/Update on Accounts and Destinations

            Can view logs and members

    Modules

        User Module (signup, login, invite users)

        Account Module (CRUD)

        Destination Module (CRUD with headers, webhook config)

        Account Member Module (assign roles)

        Role Module (Admin / User)

        Log Module (track events, requests, and destinations)

        Data Handler (/server/incoming_data) for receiving and forwarding JSON data

    Other Implementations

        Rate Limiting (max 5 requests/sec for incoming data per account)

        MongoDB Atlas integration

        Async data handling with queue system (can integrate Bull.js/Redis)

        Swagger for API testing

Usage

    Open Swagger at:

    http://localhost:5000/api-docs

    First, create a user (Admin) via the signup endpoint.

    Login to get a JWT token and authorize using the "Authorize" button in Swagger.

    Use APIs to:

        Create Accounts

        Add Destinations to an Account

        Send data to /server/incoming_data

        View logs

Tech Stack

    Node.js (v12 compatible)

    Express.js

    MongoDB Atlas

    JWT Authentication

    Swagger UI

    Rate Limiting Middleware

Notes

    By default, the first registered user is an Admin.

    Only Admin can create Accounts, Destinations, and invite new users.

    Normal users have restricted access (view/update only).

