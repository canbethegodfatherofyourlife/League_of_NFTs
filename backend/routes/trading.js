const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Auction = require("../models/Auction");

router.get("/:id/:id1", async function (req, res) {
  try {
    const _id1 = req.params.id1;
    const tradingData = await User.find({ playerId: _id1 });
    let sellAmounts = [];
    tradingData.map((item, index) => {
      if (item.sellAmount > 0) {
        sellAmounts.push([item.address, item.sellAmount]);
      }
    });
    let a = sellAmounts.length;
    if (a < 5) {
      for (let i = 0; i < 5 - a; i++) {
        sellAmounts.push([null, 0]);
      }
    }
    sellAmounts.sort(function (a, b) {
      return parseInt(a[1]) - parseInt(b[1]);
    });
    let displaysellAmounts = sellAmounts.slice(
      0,
      Math.min(5, sellAmounts.length)
    );
    res.send(displaysellAmounts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Some error occured!");
  }
});

router.get('/:id/', async function (req, res) {
  try {
      const playerid = req.params.id
      const tradingData = await User.find({playerId: playerid})
      let sellAmounts = []
      tradingData.map((item, index) => {
          if (item.sellAmount > 0) {
              sellAmounts.push([true,item.sellAmount,item.address])
          }
      })
      if (sellAmounts.length == 0) {
          res.send([[false,null],null])
      }
      sellAmounts.sort(function (a, b) {
          return parseInt(a[1]) - parseInt(b[1]);
      })
      res.send(sellAmounts[0])
  } catch (error) {
      console.log(error.message)
      res.status(500).json("Some error occured!")      
  }
})

router.patch('/:id/:id1/:id2', async function (req, res) {
  try {
      const bidder = req.params.id
      const playerId1 = req.params.id1
      const receiver = req.params.id2
      await User.findOneAndUpdate({address: receiver},req.body[0])
      const bidderUpdate = await User.findOne({address: bidder})
      if (!bidderUpdate){
          let user = await User.create({
              address: bidder,
              playerId1: 0,
              history: []
          })
          user.save()
      }
      await User.findOneAndUpdate({address: bidder},req.body[1])
      await User.findOneAndUpdate({address: bidder},{ $push: { history: playerId1 } })
     res.send("Trading Value Updated!")

  } catch (error) {
      console.log(error.message)
      res.status(500).json("Some error occured!")      
  }
})

module.exports = router;
