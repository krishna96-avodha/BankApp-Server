// import jsonwebtoken
const jwt = require("jsonwebtoken")

// import user model 
const db = require("./db")



database = {
  1000: { acno: 1000, uname: "Neel", password: 1000, balance: 5000, transaction: [] },
  1001: { acno: 1001, uname: "Aysha", password: 1001, balance: 5000, transaction: [] },
  1002: { acno: 1002, uname: "Ananaya", password: 1002, balance: 5000, transaction: [] }

}



const register = (acno, password, uname) => {
  // asynchronous
  return db.User.findOne({acno})
    .then(user=>{
      if (user) {
        return {
          statusCode: 422,
          status: false,
          message: "ALready existt!!!!!!!!!!!!! Please Log in...."
        }

      }
      else {
        const newUser =  new db.User({
          acno,
          uname,
          password,
          balance: 0,
          transaction: []

        })
        newUser.save()
        return {
          statusCode: 200,
          status: true,
          message: "Registered successfully!!!!!!"
        }
      }
    })
}



// login-

const login = (acno, password) => {
  // asynchronous
  return db.User.findOne({ acno, password })
    .then(user => {
      if (user) {

        currentAcno = acno
        currentuname = user.uname

        // token generation

        const token = jwt.sign({
          currentAcno: acno
        }, 'supersecretkey123')


        return {
          statusCode: 200,
          status: true,
          message: "successfully log in!!!!!!!!",
          currentAcno,
          currentuname,
          token
        }
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "incorrect password"
        }

      }

    })

}




//Deposit


const deposit = (acno, password, amt) => {
  let amount = parseInt(amt)
  // asynchronous
  return db.User.findOne({ acno, password })
    .then(user => {
      if (user) {
        user.balance += amount
        user.transaction.push({
          amount: amount,
          type: "CREDIT"
        })

        user.save()
        return {
          statusCode: 200,
          status: true,
          message: amount + "successfully deposited.. New balance is" + user.balance
        }


      }
      else {
        return {
          statusCode: 411,
          status: false,
          message: "incorrect password"
        }

      }
    })
}

// withdraw

const withdraw = (req,acno, password,amt) => {
  var amount = parseInt(amt)
  var currentAcno = req.currentAcno

  return db.User.findOne({acno,password})
  .then(user =>{

    if (user) {

      if (currentAcno!=acno) {


          return {
            statusCode: 411,
            status: false,
            message: "Permission Denied"
          }
        }

        if (user.balance > amount) {

          user.balance -= amount
          user.transaction.push({
            amount: amount,
            type: "DEBIT"
          })

          user.save()
          return {
            statusCode: 200,
            status: true,
            message: amount + "successfully debitted.. New balance is" + user.balance
          }

        } else {
          return {
            statusCode: 411,
            status: false,
            message: "insuffient balance"
          }

        }

      }
      else {
        return {
          statusCode: 411,
          status: false,
          message: "incorrect password /account number"
        }

      }
    })
}






// Transaction
const getTransaction = (acno) => {

  return db.User.findOne({acno})
.then(user=>{
  if(user){
    return{
      statusCode: 200,
      status: true,
      transaction: user.transaction

    }
  }
  else{
    return {
      statusCode: 422,
      status: false,
      message: "user doesnot exist"

  }
}
})


}


// delete api

 const deleteAcc = (acno)=>{
  //  asynchronous
  return db.User.deleteOne({acno})
  .then(user=>{
    if(!user){
      return{
        statusCode: 422,
        status: false,
        message: "operation failed"
  

      }
    }
    return{
      statusCode: 200,
            status: true,
            message:"The requested account number "+acno+"deleted successfully"
          }

    
  })
 }






module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc
}
