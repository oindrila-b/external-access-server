# EXTERNAL ACCESS SERVER

This is the server side of the connect extension. This server is built using node-typescript and express.
 The server side uses the following dependencies :
 - Node Typescript
 - Express
 - Cors [Cross-Origin-Resource-Sharing]
 - Nango [Nango can be found [here](https://www.nango.dev/)]
 - Dotenv

## About the server:
The server uses `nango api integration` to connect to external resources like Github, Jira, etc on behalf of the user and fetch their resources.

Nango - Nango is a single API to interact with all other external APIs. 


## Features :
The server  runs on PORT `3000` locally and has the following end-point for a frontend application:

- `'/list/:integration?/:entity?'` - This is the one and only endpoint for the server. 
 - The server logically maps the required methods internally using the `integration` and `entity` values.
    - Integration Values :
        - `github`  - All the requests containing `github` as the integration parameter will be accessing `github` resources.

        - `jira` - All the requests containing `jira` as the integration parameter will be accessing `jira` resources.
    - Entity Values : 
        - `Github` :
            - `repository` - Requests containing `repository` as the entity parameter will get all the repositories associated with the authenticated user.
            - `starred` - Requests containing `starred` as the entity parameter will get all the repositories that the authenticated user has starred.


