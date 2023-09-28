const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//models

const User = require('../models/user');


const dotenv = require('dotenv');
dotenv.config({path:'config.env'});
// create token functions
const createToken =require('../utils/createToken')
// const createAdminToken =require('../utils/createAdminToken')







exports.login = async (req,res,next)=>{
    const username =req.body.username;
    const password =req.body.password;
    // res.status(200).json({ password,user});
      User.findByPk(username).then(async (user)=>{
        if(!user|| !(await bcrypt.compare(password, user.password))){
          return res.send('Incorrect username or password');
        }
        const token =createToken(user.username);
        res.status(200).json({ user:user,token});
        }).catch ((err) =>{
          res.status(500).send(err.message || "Something went wrong");
        });
  };



  exports.protect = async (req, res, next) => {
    console.log("token", req.headers.authorization)
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }else res.send('plese send a token to verify you');
    if (!token) {
      return next(
          res.send('You are not login, Please login to get access this route')
      );
    }
  
    // 2) Verify token (no change happens, expired token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
    // 3) Check if user exists
    const currentUser = await User.findByPk(decoded.userId);
    if (!currentUser) {
      res.send('The user that belong to this token does no longer exist')
    }
    if (currentUser.passwordChangedAt) {
      const passChangedTimestamp = parseInt(
        currentUser.passwordChangedAt.getTime() / 1000,
        10
      );
      if (passChangedTimestamp > decoded.iat) {
        return res.send('User recently changed his password. please login again..');
      }
    }
    
    if(currentUser.logoutAt){
      const logoutAt = parseInt(
        currentUser.logoutAt.getTime() / 1000,
        10
      );
      if (logoutAt > decoded.iat) {
        return res.send('you recently logout. please login again ..');
      }
    }
    req.user = currentUser;
    next();
};

 

//   exports.protectAdmin = async (req, res, next) => {
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       token = req.headers.authorization.split(' ')[1];
//     }
//     if (!token) {
//       return next(
//           res.send('You are not login, Please login to get access this route')
//       );
//     }
  
//     // 2) Verify token (no change happens, expired token)
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
//     // 3) Check if user exists
//     const currentAdmin = await Admin.findByPk(decoded.adminId);
//     if (!currentAdmin) {
//       res.send('The user that belong to this token does no longer exist')
//     }
//     req.admin = currentAdmin;
//     next();
// };

 

  exports.logout = async (req, res, next) => {
    User.findByPk(req.user.id)
    .then(async user => {
      if(user){
      user.logoutAt=Date.now();
      return user.save();
      }
    }).then(result=>{
      if(result){
        res.send("you logout");
      }else res.send("womething went wron, please login again");
    }).catch(err => {
      res.status(500).send(err.message );
    });
  };
