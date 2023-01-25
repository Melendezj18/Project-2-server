const express = require('express')

const Team = require('../models/team')

const { requireToken } = require('../config/auth')

const router = express.Router()

router.get('/teams', requireToken, (req, res, next) => {
	Team.find()
		.then((team) => {
			return team.map((team) => team)
		})
		.then((team) => res.status(200).json({ team: team }))
		.catch(next)
})