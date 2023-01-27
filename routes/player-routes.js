const express = require('express')
const router = express.Router()

const Team = require('../models/team')

const { requireToken } = require('../config/auth')

//create
router.post('/players', requireToken, (req, res, next) => {
    const teamId = req.body.player.teamId
    console.log(req.user)
    const player = req.body.player
    Team.findById(teamId)
        .then(team => {
            team.player.push(player)
            return team.save()
        })
        .then(team => {
            res.status(201).json({ team: team })
        })
    .catch(next)
})

//update
router.patch('/player/:playerId', (req, res, next) => {
    const teamId = req.body.player.teamId

    const playerBody = req.body.player

    Team.findById(teamId)
        .then(handle404)
        .then(team => {
            // finding the player by it's id
            const player = team.players.id(req.params.playerId)

            // setting the new player content to be the content passed in
            player.set(playerBody)

            // saving it
            // I have modified the doc I need to save it
            return team.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

//delete
router.delete('/players/:playerId', (req, res, next) => {
    const teamId = req.body.player.teamId

    Team.findById(teamId)
        .then(team => {
            //finding the correct player to remove
            //.remove() we delete it
            team.players.id(req.params.playerId).remove()

            // since I've modified I have to save
            return team.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router