const router = require('express').Router();
const routesClothes = require('./clothes');

const routesPayments = require('./paymentMethods');

//const passport = require('passport');

//router.use('/users', )

router.use('/clothes',routesClothes )
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
