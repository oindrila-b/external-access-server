# EXTERNAL ACCESS SERVER

This is the server side of the connect extension. This server is built using node-typescript and express.
 The server side uses the following dependencies :
 - Node Typescript
 - Express
 - Cors [Cross-Origin-Resource-Sharing]
 - Nango [Nango can be found [here](https://www.nango.dev/)]
 - Dotenv

The client side of the project can be found [here](https://github.com/oindrila-b/connect-extension)

## About the server:
The server uses `nango api integration` to connect to external resources like Github, Jira, etc on behalf of the user and fetch their resources.

Nango - Nango is a single API to interact with all other external APIs. 

The server is built in typescript and the compiled javascript code is generated in the `./dist` folder

#### The server runs on port `5000` locally

#### The server is hosted at `https://external-access-server.onrender.com`

## Features :
The server  runs on PORT `3000` locally and has the following end-point for a frontend application:

- `'/list/:integration?/:entity?'` - This is the endpoint for the server that handles fetching resources from github / jira. 
 - The server logically maps the required methods internally using the `integration` and `entity` values.
    - Integration Values :
        - `github`  - All the requests containing `github` as the integration parameter will be accessing `github` resources.

        - `jira` - All the requests containing `jira` as the integration parameter will be accessing `jira` resources.
    - Entity Values : 
        - `Github` :
            - `repository` - Requests containing `repository` as the entity parameter will get all the repositories associated with the authenticated user.
            - `starred` - Requests containing `starred` as the entity parameter will get all the repositories that the authenticated user has starred.
        - `Jira` :
            - `issues` - Requests containing `issues` as the entity parameter will get all the issues associated with the authenticated user.
            - `projects` - Requests containing `projects` as the entity parameter will get all the projects that the authenticated user has starred.    

 - `/commits/:repository` -  This end point is for when the user wants to get commits for a specific repository. The `repository` parameter takes in a repsoitory name that belongs to the authenticated user and fetches their data'


## How to run the project locally :
 Here's how one can run the project locally : 
  - Execute the command `npm install` to install all the dependencies
  - `npm run build` to build the project.
  - `npm start` to start the project localy.