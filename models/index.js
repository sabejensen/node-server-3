const mongoose = require('mongoose')
const Schema = mongoose.Schema

let team = new Schema({
    name: String,
    team: Array
})

module.exports = mongoose.model("team", team)