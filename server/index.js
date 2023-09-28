const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const app = express();
const session=require('express-session')
const cookieSession = require("cookie-session");
const passport = require("passport");
require('./passport');

//*************************************************
// app.use(
//   cookieSession({ name: "session", keys: ["secret_key"], maxAge: 24 * 60 * 60 * 100 })
// );
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// //!
// //Session configuration

//*************************************************
//models
 const User = require('./models/user');

// routers
// const profileRoutes =require('./routes/profile_route');
const userRoutes =require('./routes/user_route');
const socialRoutes= require('./routes/social_route.js')



//env file
//auth controller
 const auth =require('./controllers/auth_controller');

const dotenv = require('dotenv');
dotenv.config({path:'config.env'});
// create token function
// const ApiError = require('../utils/apiError');



const PORT =process.env.PORT || 5000;
const HOST = process.env.HOST||'127.0.0.1';
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
app.use('/auth',socialRoutes);

 app.use('/api/login',auth.login);
 app.use('/api/user',userRoutes);
//app.use('/api/profile',profileRoutes);

//app.post('/api/logout',auth.protect,auth.logout);




app.all('*', (req, res, next) => {
  res.status(400).send(`Can't find this route: ${req.originalUrl}`);
});







sequelize.sync({forse: true})
  .then(() => {
    console.log("DB Sync Done Successfully!");
    app.listen(PORT, HOST, () => {
      console.log(`Server is listening on http://${HOST}:${PORT}`)
    });
  })
  .catch((err) => {
    console.log(`Failed to Sync with DB: ${err.message}`);
  });


