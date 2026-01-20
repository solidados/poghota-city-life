require( 'dotenv' ).config()

const express = require( 'express' )
const sequelize = require( './config/database' )
const complaintRoutes = require( './routes/complaints' )
const userRoutes = require( './routes/user' )


// * express app
const app = express()

// * middleware
app.use( express.json() )

app.use( ( req, res, next ) => {
  console.log( req.path, req.method )
  next()
} )

// * routes (setting up a route listener)
app.use( '/api/complaints', complaintRoutes )
app.use( '/api/user', userRoutes )

// * connect to DB via sequelize and sync models
sequelize.authenticate()
        .then( () => {
          console.log( 'Database connection established successfully.' )
          // sync all models with database (creates tables if they don't exist)
          return sequelize.sync()
        } )
        .then( () => {
          // listen for requests
          app.listen( process.env.PORT, () => {
            console.log( `Database synced and listening on port ${ process.env.PORT }` )
          } )
        } )
        .catch( ( error ) => console.error( 'Unable to connect to database:', error.message ) )
