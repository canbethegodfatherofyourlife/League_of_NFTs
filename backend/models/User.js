const mongoose = require('mongoose')

const user = mongoose.Schema(
    { 
        address: {type: String,required: true,unique: [true,"Address Exists!"]},
        score: {type: Number,default:0},
        playerId: {type: Number},
        history : [
            {type: Number},
        ],
        sell: {type: Boolean,default: false},
        sellAmount : {type: Number,default:0},
    },
    {
        timestamps: {type: Date,default: Date.now()},
    }
)

const User = mongoose.model('User',user)

module.exports = User;