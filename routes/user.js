const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { savedRedirecUrl } = require("../middleware.js");

const userControllers = require("../controllers/user.js");

router
    .route("/signup")
    .get(userControllers.renderSignUpform)
    .post(wrapAsync(userControllers.signUp));
     
router
    .route("/login")
    .get(userControllers.renderLoginForm)
    .post( 
       savedRedirecUrl,
       passport.authenticate('local', {
          failureRedirect: '/login',
          failureFlash : true 
       }),
      userControllers.Login
    );

router.get("/logout", userControllers.Logout);

module.exports = router;
