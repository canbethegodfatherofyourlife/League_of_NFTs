const express = require( 'express' )
const router = express.Router()
const User = require( '../models/User' )


router.patch( '/:id', async function ( req, res ) {
    try {
        const _id = req.params.id
        const updatedData = await User.findOneAndUpdate( { address: _id }, req.body, { new: true } )
        res.send( updatedData )
    } catch ( error ) {
        console.log( error.message )
        res.status( 500 ).json( "Some error occured!" )
    }
} )

module.exports = router