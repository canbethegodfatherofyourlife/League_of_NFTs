const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Auction = require("../models/Auction");

// GET request to the score and rank of the user
router.get("/", async function (req, res) {
  try {
    const leaderboardData = await User.find(
      {},
      { address: 1, score: 1, _id: 0 }
    )
      .sort({ score: -1 })
      .limit(100);
    res.send(leaderboardData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Some error occured!");
  }
});

router.get( '/:id', async function ( req, res ) {
  try {
      const _id = req.params.id
      const profileData = await User.find( { address: _id } )
      if ( profileData.length === 0 ) {
          res.send( {} )
          return
      }
      const allData = await User.find()
      let scores = []
      allData.map( ( item, index1 ) => {
          scores.push( item.score )
      } )
      scores = scores.sort( ( function ( a, b ) {
          return parseInt( a ) - parseInt( b );
      } ) )
      scores.reverse()
      let score1 = profileData[ 0 ].score
      let index1 = scores.indexOf( score1 )
      let profileData1 = { ...profileData, "leaderboard": index1 + 1 }
      res.send( profileData1 )
  } catch ( error ) {
      console.log( error.message )
      res.status( 500 ).json( "Some error occured!" )
  }
} )

module.exports = router;
