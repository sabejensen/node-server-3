const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const MongoClient = require("mongodb").MongoClient
const mongoose = require('mongoose')
const path = require('path');

const app = express()
const router = express.Router();

const teamRoute = require('./routes/team')

let Team = require('./models/index')

let port = process.env.PORT || 3080;

const mongoConnect = require('./util/database')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

app.use(bodyParser.urlencoded({ extended: true }))

const server = http.createServer(app)

server.listen(port, () => {
    MongoClient.connect('mongodb+srv://pokeadmin:GPzq9oYhFQrEffvU@cluster0.obhnr.mongodb.net/teams?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then((client) => {
        const db = client.db('teams')
        const teamsCollection = db.collection('user-teams')

        app.post("/add-team", (req, res) => {
            let currentTeam = {
                name: req.body.title,
                team: req.body.team.split(',')
            }
            teamsCollection.insertOne(new Team(currentTeam))
            .then(result => res.redirect('/'))
            .catch(err => console.error(err))
        })
        
        app.get('/new-team', (req, res, next) => {
            db.collection('user-teams').find().toArray()
            .then(results => res.json(results))
            .catch(err => console.error(err))
        })

        const deleteTeam = (teamID) => {
            console.log('ID: ', teamID)
            db.collection('user-teams').find().toArray()
            .then(results => {
                return teamsCollection
                    .deleteOne(results.find(x => x._id == teamID))
                    .then(result => console.log('Deleted Team'))
                    .catch(err => console.error(err))
            })
        }

        app.use(bodyParser.json())

        app.delete('/delete-team', (req, res, next) => {
            console.log('DELETION RECEIVED ', req.body.id)
            deleteTeam(req.body.id)
        })

        app.put('/edit-team', (req, res, next) => {
            console.log('PATCH RECEIVED ', req.body.id)
            db.collection('user-teams').find().toArray()
            .then(results => {
                console.log(results)
                return teamsCollection
                .updateOne(
                    results.find(x => x._id == req.body.id),
                    {
                        $set: {
                            name: req.body.name,
                            team: req.body.team
                        }
                    }
                )
            })
        })

    })

    for(let i = 1; i < 152; i++) {
        app.get("/api" + i.toString(), (req, res) => {
            axios.get('https://pokeapi.co/api/v2/pokemon/' + i.toString())
            .then(response => {
                // console.log(response.data);
                // console.log(response.data);
                // console.log("THIS RUNS")
                res.json(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            // res.json(pokemon)
          });
    }
})




// for(let i = 1; i < 152; i++) {
//     app.get("/api" + i.toString(), (req, res) => {
//         axios.get('https://pokeapi.co/api/v2/pokemon/' + i.toString())
//         .then(response => {
//             // console.log(response.data);
//             // console.log(response.data);
//             // console.log("THIS RUNS")
//             res.json(response.data);
//         })
//         .catch(error => {
//             console.log(error);
//         })
//         // res.json(pokemon)
//       });
// }