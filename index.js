
// import express
const express = require('express');
const res = require('express/lib/response');

// create an app using express
const app = express()



const dataservice = require('./service/data.service')


// parse
app.use(express.json())


// resolve http req from client


//  GET:=> to read data

app.get('/', (req, res) => {
    res.send("ITS A GET METHOD")
})

//  POST :=> to create data
app.post('/', (req, res) => {
    res.send("ITS A POST METHOD")
})


//  PUT :=> to create data
app.put('/', (req, res) => {
    res.send("ITS A PUT METHOD")
})


//  PATCH :=> to update data
app.patch('/', (req, res) => {
    res.send("ITS A PATCH METHOD")
})


//  DELETE :=> to create data
app.delete('/', (req, res) => {
    res.send("ITS A DELETE METHOD")
})


// --------------------------------------------------





// Bank API..............................................................................
  
// 1) register api

app.post('/register', (req, res) => {
    const result = dataservice.register(req.body.acno, req.body.password, req.body.uname)
   res.status(result.statusCode).json(result)
})

// 2) login api

app.post('/login', (req, res) => {
    const result = dataservice.login(req.body.acno, req.body.password)
   res.status(result.statusCode).json(result)
})


// 2) deposit api

app.post('/deposit', (req, res) => {
    const result = dataservice.deposit(req.body.acno, req.body.password,req.body.amt)
   res.status(result.statusCode).json(result)
})



// 2) withdraw api

app.post('/withdraw', (req, res) => {
    const result = dataservice.withdraw(req.body.acno, req.body.password,req.body.amt)
   res.status(result.statusCode).json(result)
})


// set up the port number
app.listen(3000, () => {
    console.log("Server started at port number:3000");
})