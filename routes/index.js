
const router = require('express').Router();
const routesClothes = require('./clothes');
const routeSwagger = require('./swagger');
const routesOrders =  require('./orders');
const routesPayments = require('./paymentMethods');
const routesUsers = require('./users');

//const passport = require('passport');

router.use('/users', routesUsers)
router.use('/clothes',routesClothes )
router.use('/clothes',routesClothes )
router.use('/orders',routesOrders);
router.use('/paymentMethods', routesPayments)
router.use('/', routeSwagger);

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
