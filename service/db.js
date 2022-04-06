// mongo db connection details 


// import mongoos
const mangoose = require('mongoose')

// stste connection string
mangoose.connect('mongodb://localhost:27017/Bank', {
    UseNewUrlParser: true,
})


// model creation

const User = mangoose.model('User', {
    acno: Number,
    uname: String,
    password: String,
    balance: Number,
    transaction: []
})

// export model

module.exports = {
    User
}