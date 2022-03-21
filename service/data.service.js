const jwt = require("jsonwebtoken")
database = {
  1000: { acno: 1000, uname: "Neel", password: 1000, balance: 5000, transaction: [] },
  1001: { acno: 1001, uname: "Aysha", password: 1001, balance: 5000, transaction: [] },
  1002: { acno: 1002, uname: "Ananaya", password: 1002, balance: 5000, transaction: [] }

}



const register = (acno, password, uname) => {

  if (acno in database) {
    return {
      statusCode: 411,
      status: false,
      message: "ALready existt!!!!!!!!!!!!! Please Log in...."
    }
  }
  else {
    database[acno] = {
      acno,
      uname,
      password,
      balance: 0,
      transaction: []

    }
    // this.storeData()
    console.log(database)
    return {
      statusCode: 200,
      status: true,
      message: "Registered successfully!!!!!!"
    }

  }
}



// login-

const login = (acno, password) => {

  if (acno in database) {
    if (password == database[acno]["password"]) {
      currentAcno = acno
      currentuname = database[acno]["uname"]

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
  }
  else {
    return {
      statusCode: 411,
      status: false,
      message: "user doesnt exist"
    }
  }


}




//Deposit

const deposit = (acno, password, amt) => {
  let amount = parseInt(amt)

  if (acno in database) {

    if (password == database[acno]["password"]) {

      database[acno]["balance"] += amount

      // 
      database[acno]["transaction"].push({
        amount: amount,
        type: "CREDIT"
      })


      return {
        statusCode: 200,
        status: true,
        message: amount + "successfully deposited.. New balance is" + database[acno]["balance"]

      }

    }
    else {
      return {
        statusCode: 411,
        status: false,
        message: "incorrect password"
      }
    }

  }
  else {
    return {
      statusCode: 422,
      status: false,
      message: "user doesnot exist"
    }
  }

}



// withdraw

const withdraw = (acno, password, amt) => {
  let amount = parseInt(amt)



  
  if (acno in database) {

    if (password == database[acno]["password"]) {

      if (database[acno]["balance"] > amount) {

        database[acno]["balance"] -= amount

        database[acno]["transaction"].push({
          amount: amount,
          type: "DEBIT"
        })

        return {
          statusCode: 200,
          status: true,
          message: amount + "successfully debited.. New balance is" + database[acno]["balance"]

        }

      }
      else {

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
        message: "incorrect password"
      }
    }

  }




  else {
    return {
      statusCode: 422,
      status: false,
      message: "user doesnot exist"
    }
  }
}


// Transaction
const getTransaction = (acno) => {
  if (acno in database) {
    return {
      statusCode: 200,
      status: true,
      transaction: database[acno]["transaction"]

    }

  }
  else {



    return {
      statusCode: 422,
      status: false,
      message: "user doesnot exist"
    }
  }

}





module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}
