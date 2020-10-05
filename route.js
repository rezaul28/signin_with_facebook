const express = require('express');
const router = express.Router();
const facebooklogin = require('./controller/facebook_login');
const passport = require('passport');

router.use(passport.initialize());

router.get('/auth/facebook',passport.authenticate('facebook',{ scope: ["email","public_profile","user_friends"] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),facebooklogin.cbFromFacebook)
router.get("/logout",facebooklogin.logout)
module.exports = router;
