const router = require('express').Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete', auth, userCtrl.deleteUser);

module.exports = router;
