const routesPayments = require('./paymentMethods');
//const routeSwagger = require('./swagger');

const express = require('express');
const router = express.Router();
//const passport = require('passport');

//router.use('/users', )
//router.use('/clothes', )
router.use('/orders', require('./orders'));
router.use('/paymentMethods', routesPayments)
router.use('/', require('./swagger'));

//router.get('/login', passport.authenticate('github'), (req, res) => {});
/*
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
       if (err) {
            return next(err);
      }
        res.redirect('/');
    });
});
*/
module.exports = router
