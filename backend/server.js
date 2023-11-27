require( 'dotenv' ).config()

const express = require( 'express' )
const mongoose = require( 'mongoose' )
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

// * connect to DB via mongoose
mongoose.connect( process.env.MONGO_URI )
        .then( () => {
          // listen for requests
          app.listen( process.env.PORT, () => {
            console.log( `connected to DB and listening on port ${ process.env.PORT }` )
          } )
        } )
        .catch( ( error ) => console.error( error.message ) )
