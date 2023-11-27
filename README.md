<h1 align="center">
Poghota App
</h1>
<p align="center">
<img src="https://github.com/solidados/poghota-city-life/assets/81189948/e785ab2d-c45b-4182-9bdb-e98505ace8ab" alt="logo" width="180" />
</p>
<p align="center"><i>city-life</i></p>
<h3 align="center">
Tumo labs project for city life
</h3>

## Overview

To start the project:

- clone, copy ZIP or fork this repo
- goto `backend` folder and install all dependencies:

> `$ cd <project folder>/backend`  
`$ npm install`  
`$ npm run dev:serve`  
> This must show that the server runs on localhost:4000

- goto `frontend` folder and install all dependencies:

> `$ cd <project folder>/frontend`  
`$ npm install`  
`$ npm start`  
`localhost:3000` will be opened in new web browser's tab

## Technology Stack

> The 'Poghota' project is an application built using the following technology stack:

### Frontend:

**[React](https://react.dev/reference/react)**: Application is based on this JS library  
**[Prettier](https://www.npmjs.com/package/prettier)**: An opinionated code formatter that ensures consistent code
style across the project.  
**[ESLint](https://www.npmjs.com/package/eslint)**: A JavaScript linter that identifies and enforces coding patterns
and best practices.  
**[Husky](https://www.npmjs.com/package/husky)**: A Git hook manager used to trigger scripts on pre-commit and
pre-push actions.  
**[lint-staged](https://www.npmjs.com/package/lint-staged)**: A tool that runs linters on staged
files to enforce code quality before committing.  
**[date-fns](https://www.npmjs.com/package/date-fns)**: Plugin that provides the most comprehensive, yet simple and
consistent toolset for manipulating `JavaScript` dates in a browser & `Node.js`

### Backend:

**[mongoDB](https://www.mongodb.com/atlas/database)**: Application stores its information in this cloud Database  
**[mongoose](https://www.npmjs.com/package/mongoose)**: Object modeling tool designed to work in an asynchronous
environment  
**[express](https://www.npmjs.com/package/express)**: Minimalist web framework for `Node.js`  
**[bcrypt](https://www.npmjs.com/package/bcrypt)**: A library that helps to hash passwords  
**[dotenv](https://www.npmjs.com/package/dotenv)**: A zero-dependency module that loads environment variables from a
`.env` file into `process.env`  
**[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: An implementation of JSON Web Tokens  
**[validator](https://www.npmjs.com/package/validator)**: A library of string validators and sanitizers

## Setting up and Running the Project Locally

### Prerequisites

Before you begin, ensure that you have the following software installed on your machine:

1. Node.js (v14.x or higher)
2. npm (Node Package Manager) or yarn

### Clone the Repository

1. Open your terminal or command prompt.
2. Change the current working directory to the location where you want to clone the project.
3. Run the following command to clone the repository:

   > `git clone https://github.com/<your-username>/poghota-city-life.git`

   Replace `<your-username>` with your actual GitHub username.

4. Change into the project directory:
   > `cd poghota-city-life`

### Install Dependencies

1. After navigating to the project directory, install the required dependencies using npm or yarn:\
   Using npm:`npm install`\
   Using yarn:`yarn install`

### Build the Project

1. To build the project, run the following command:\
   Using npm:`npm run build`\
   Using yarn:`yarn build`

### Start the Development Server

1. To start the development server and view the application in your browser, use the following command:\
   Using npm:`npm start`\
   Using yarn:`yarn start`\
   This will start the development server, and the application will be accessible at `http://localhost:8080`.
