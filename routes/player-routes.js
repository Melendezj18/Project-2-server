const express = require('express')
const router = express.Router()

const Team = require('../models/team')

const { requireToken } = require('../config/auth')

//create
router.post('/players', (req, res, next) => {
    const teamId = req.body.player.teamId
    const player = req.body.player
    console.log(req.body)

    Team.findById(teamId)
        .then(team => {
            team.players.push(req.body.player)
            return team.save()
        })
        .then(team => {
            res.status(201).json({ team: team })
        })
    .catch(next)
})

//show
router.get("/players/:playerId", (req, res, next) => {
    const teamId = req.body.player.teamId;
    Team.findById(teamId)
    .then((team) => {
        const player = team.players.id(req.params.playerId);
        res.status(200).json({ player: player });
    })
    .catch(next);
});

//index
router.get('/players', (req, res, next) => {
    const teamId = req.body.player.teamId
    Team.find(teamId)
      .then(team => {
        res.status(200).json({ players: team.players })
      })
      .catch(next)
  })
    
//update
router.patch('/player/:playerId', (req, res, next) => {
    const teamId = req.body.player.teamId
    const playerBody = req.body.player

    Team.findById(teamId)
        .then(team => {
            const player = team.players.id(req.params.playerId)
            player.set(playerBody)
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
            team.players.id(req.params.playerId).remove()
            return team.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router