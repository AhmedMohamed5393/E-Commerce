var express           = require('express'),
    router            = express.Router(),
    bodyParser        = require('body-parser'),
    parseUrlencoded   = bodyParser.urlencoded({ extended: true }),
    authentication    = require('../middlewares/authentication'),
    signupcontroller  = require('../controllers/users/signup'),
    signincontroller  = require('../controllers/users/login'),
    profilecontroller = require('../controllers/users/profile');
router.get('/user/:id/profile', parseUrlencoded, authentication.isLoggedIn, 
                                                 profilecontroller.GetUserProfile);
router.get('/user/logout', parseUrlencoded, authentication.isLoggedIn, authentication.logout);
router.get('/user/signup', parseUrlencoded, authentication.notLoggedIn, 
                                            signupcontroller.GetSignUpPage);
router.post('/user/signup', parseUrlencoded, signupcontroller.PostSignUpPage);
router.get('/user/login', parseUrlencoded, authentication.notLoggedIn,
                                           signincontroller.GetSignInPage);
router.post('/user/login', parseUrlencoded, signincontroller.PostSignInPage);
router.use('/user/login', parseUrlencoded, authentication.notLoggedIn, 
                                           authentication.checkNotLogged);
module.exports = router;