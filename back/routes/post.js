const router = require('express').Router();
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');

router.post('/', auth, postCtrl.new_post);
router.put('/:post_id', auth, postCtrl.update_post);
router.delete('/:post_id', auth, postCtrl.delete_post);
router.get('/', auth, postCtrl.get_all_post);
router.get('/:post_id', auth, postCtrl.get_one_post);

module.exports = router;