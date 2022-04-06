const jwt = require("jsonwebtoken")
const cors = require("cors")

// import express
const express = require('express');
const res = require('express/lib/response');

// create an app using express
const app = express()

//use cors to specify origin 
app.use(cors({
    origin:'http://localhost:4200'
}))



const dataservice = require('./service/data.service')


// parse
app.use(express.json())


// ************************************************************************

// application specific middleware
// const appMiddleware = (req,res,next)=>{
//     console.log("Application specific middleware");
//     next()
// }

// app.use(appMiddleware)

// to varify miidle ware
const jwtMiddleware = (req,res,next)=>{
    try{
        const token =req.headers["x-access-token"]
        // varifytoken
        const data = jwt.verify(token,'supersecretkey123')
        req.currentAcno = data.currentAcno
        next()
    }
    catch{
        res.status(422).json({
            statusbar:422,
            status:false,
            message:"please Log in"
        })

    }
}

// **************************************************************************


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
     dataservice.register(req,req.body.acno, req.body.password, req.body.uname)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
})

// 2) login api

app.post('/login', (req, res) => {
    // asynchronous

  dataservice.login(req.body.acno, req.body.password)
  .then(result=>{
    res.status(result.statusCode).json(result)

  })
})


// 2) deposit api

app.post('/deposit',jwtMiddleware, (req, res) => {
    dataservice.deposit(req.body.acno, req.body.password,req.body.amt)
    .then(result=>{
   res.status(result.statusCode).json(result)
})
})



// 3) withdraw api

app.post('/withdraw',jwtMiddleware, (req, res) => {
         dataservice.withdraw(req,req.body.acno, req.body.password,req.body.amt)
    .then(result=>{
   res.status(result.statusCode).json(result)
})
})

// 4) transaction api


app.post('/getTransaction',jwtMiddleware, (req, res) => {
     dataservice.getTransaction(req.body.acno)
     .then(result=>{

   res.status(result.statusCode).json(result)
})
})


app.delete('/deleteAcc/:acno',jwtMiddleware, (req, res) => {
    // asynchronous
     dataservice.deleteAcc(req.params.acno)
     .then(result=>{

   res.status(result.statusCode).json(result)
})
})


// set up the port number
app.listen(3000, () => {
    console.log("Server started at port number:3000");
})