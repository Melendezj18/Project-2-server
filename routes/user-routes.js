const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { createUserToken } = require('../config/auth')
const router = express.Router()


router.post('/sign-up', (req, res, next) => {
	console.log(req.body)
	bcrypt
		.hash(req.body.credentials.password, 10)
        .then((hash) =>({
				email: req.body.credentials.email,
				password: hash,
			})
		)
		.then((user) => User.create(user))
		.then((user) => res.status(201).json(user))
		.catch(next)
})

router.post('/sign-in', (req, res, next) => {
	User.findOne({ email: req.body.credentials.email })
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token }))
		.catch(next)
});

module.exports = router