const mongoose = require('mongoose')
const playerSchema = require('./player')

const Schema = mongoose.Schema

const teamSchema = new Schema(
    {
        teamName: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required:true
        },
        players: [playerSchema]
    },
    {
        timestamps: true
    }
)

const Team = mongoose.model('Team', teamSchema)

module.exports = Team