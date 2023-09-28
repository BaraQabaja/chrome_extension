const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const User = require("./models/user");

const GOOGLE_CLIENT_ID =
  "951278813421-dts8qtaf6brboipgio40pl03fopkjkuj.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";


// FACEBOOK_APP_ID = "your id";
// FACEBOOK_APP_SECRET = "your id";

passport.use(new GoogleStrategy(
    {
      clientID: '951278813421-dts8qtaf6brboipgio40pl03fopkjkuj.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "http://localhost:5000/auth/google/callback",
      scope: ["email","profile"]
    },
    async(accessToken, refreshToken, profile, done)=>{
      console.log("^^^^^^^^^^^^^^^^^^^^^^")
      console.log(accessToken)
      console.log("^^^^^^^^^^^^^^^^^^^^^^")

      console.log(refreshToken)
      console.log("^^^^^^^^^^^^^^^^^^^^^^")

      console.log(profile)
      console.log("^^^^^^^^^^^^^^^^^^^^^^")

      console.log(done)
      console.log("^^^^^^^^^^^^^^^^^^^^^^")
      const username =  `${profile.name.givenName}${profile.name.familyName}`;
      // const password = hashPassword;

      User.create({
        username: `${profile.name.givenName}${profile.name.familyName}`,
        password: '00000000',
      })

      return done(null, profile);
    },
    // {scope: ["email","profile"]}
  )
);


// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});