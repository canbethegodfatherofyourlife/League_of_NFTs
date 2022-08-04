const mongoose = require('mongoose')

const auction = mongoose.Schema(
    {
        address: {type: String,required: true,unique: [true,"Address Exists!"]},
        playerId: { type: Number},
        bid: {type: Number}
    },
    {
        timestamps: {type: Date,default: Date.now()},
    }
)

const Auction = mongoose.model('Auction',auction)

module.exports = Auction;