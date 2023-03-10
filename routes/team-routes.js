const express = require('express')

const Team = require('../models/team')

const { requireToken } = require('../config/auth')

const router = express.Router()

//index
router.get('/teams', (req, res, next) => {
	Team.find()
		.then((teams) => {
			return teams.map((team) => team)
		})
		.then((teams) => res.status(200).json({ teams: teams }))
		.catch(next)
})

//show
router.get('/teams/:id', requireToken, (req, res, next) => {
	Team.findById(req.params.id)
		.then((team) => res.status(200).json({ team: team }))
		.catch(next)
})

//create
router.post('/teams',requireToken, (req, res, next) => {
	Team.create(req.body.team)
		.then((team) => {
			res.status(201).json({ team: team })
		})
		.catch(next)
})

//update
router.patch('/teams/:id', requireToken, (req, res, next) => {
	Team.findById(req.params.id)
		.then((team) => {
			return team.updateOne(req.body.team)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

//delete
router.delete('/teams/:id', requireToken, (req, res, next) => {
	Team.findById(req.params.id)
		.then((team) => {
			team.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router