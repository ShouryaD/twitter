let mongoose = require('mongoose')

let connection = ()=>{
    mongoose.connect('mongodb://localhost:27017/twitterPractice')
    .then(()=>console.log('Connected to MongoDB'))
    .catch((err)=>console.log(err))
}

module.exports = connection