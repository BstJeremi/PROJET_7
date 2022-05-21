const router = require('express').Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middlewares/auth');

router.post('/', auth, commentCtrl.new_comment);
router.put('/:comment_id', auth, commentCtrl.update_comment);
router.delete('/:comment_id', auth, commentCtrl.delete_comment);
router.get('/:post_id', auth, commentCtrl.get_all_comment);
router.get('/:comment_id', auth, commentCtrl.get_one_comment);

module.exports = router;