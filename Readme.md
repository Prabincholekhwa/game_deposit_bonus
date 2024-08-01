#About App
=>Game Server API
=>Depoist and Bonus Calculation Api
=> Task assement for game developer

#General Features
=>Register, Login
=>Deposit amount of user with bonus calculation

#How to start the app(command)
=>go to root directory(/game)

#Start App In Production Environmet
1=>nmp i
1.1=> npx sequelize db:seed:all(required this step if database is switched)
2=>npm run build
3=>npm run start

#Start App In Development Environmet
1=>nmp i
1.1=> npx sequelize db:seed:all(required this step if database is switched)
2=>npm run start:watch

#Apis
//User Apis
localhost:4000/api/api/v1/user(post)
requires:req.body:{"email":"useremail","fullName":"userfullname", "password":"userpassword"}
=>Register user in the system and return jwt token

localhost:4000/api/api/v1/user/login(post)
requires:req.body:{"email":"useremail", "password":"userpassword"}
=> Return the jwt token for authorization header

localhost:4000/api/api/v1/user/profile(get)
requires: Authorization headers(jwt token from login)
=>Fetch Users Profile

//BonusOption Api
localhost:4000/api/v1/bonus-option(get)
=> List available bonus options

//DepositAndBonus Apis
localhost:4000/api/v1/deposit-bonus(post)
requires:req.body:{"bonusOptionId":"bonusOptionId from bonus option api", "depositAmount":"depositamount"},
requires: Authorization Header(JWT from login)
=> Create a new deposit with bonus of a user in the system

localhost:4000/api/v1/deposit-bonus?bonusOptionId=Optional(get)
optional: req.query
requires: Authorization Header(JWT from login)
=>Retrives all deposit with bonus data of associated user and bonusOptionId if its sent in req.query

localhost:4000/api/v1/deposit-bonus/:depositId(get)
requires: req.params.depositId
requires: Authorization Header(JWT from login)
=> Retrives a detail of deposit data of params deposit id.

localhost:4000/api/v1/deposit-bonus/:depositId(put)
requires: req.body:{"depositAmount":"depositamount"}
requires: Authorization Header(JWT from login)
=> Update the corresponding depositId sent in params(adds deposit amount in the existing deposit data and make bonus changes respectively)
