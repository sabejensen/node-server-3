const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongoConnect = () => {
    MongoClient.connect('mongodb+srv://pokeapp_31:M3w7zYaQoELhlGJi@cluster0.obhnr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then((client) => {
        console.log('CONNECTED!!!')
        callback(client)
    })
    .catch(err => console.log(err))
}



module.exports = mongoConnect