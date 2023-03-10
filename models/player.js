const mongoose = require('mongoose')

const Schema = mongoose.Schema

const playerSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        wins: {
            type: Number,
            required: true
        },
        losses: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = playerSchema