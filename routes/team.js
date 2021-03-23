const path = require('path')

const express = require('express')

const router = express.Router()

// router.get('/new-team', (req, res, next) => {
//     console.log('At teams')
//     res.send('')
// })

const teams = [];

router.post('/new-team', (req, res, next) => {
    // console.log(req.body.team.split(','), req.body.title)
    let currentTeam = {
        name: req.body.title,
        team: req.body.team.split(','),
        id: Math.floor((Math.random() * 10000000000000) + 1)
    }
    teams.push(currentTeam)
    res.redirect('/')
})

router.get('/new-team', (req, res, next) => {
    res.json(teams)
})


module.exports = router