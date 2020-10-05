const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require("mongoose");
const User = require('../model/user');


passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });

passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: {CLIENT_ID},
  clientSecret: {CLIENT_SECRET},
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
function(accessToken, refreshToken, profile, done) {
    //User.findOne({user})file
    User.findOne({username : profile.email}, function(err, user){
      if(!user){
        var user = new User();
        user.facebookId= profile.id;
        user.username=profile.email;
        user.fullname=profile.displayName;
        user.save();
        console.log("created");
        return done(null, profile);
      }else{
        console.log("logged in");
        return done(null, profile);
      }
    })

  
}
));
