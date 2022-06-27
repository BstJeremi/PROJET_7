const express = require('express')
const router = express.Router()
const postsCtrl = require('../controllers/post')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')

router.get('/', postsCtrl.getAllPosts);
router.post('/', auth, multer, postsCtrl.createPost);
router.get('/:id', postsCtrl.getOnePost);
router.put('/:id', auth, multer, postsCtrl.modifyPost);
router.delete('/:id', auth, postsCtrl.deletePost);
router.post('/:id/like', auth, postsCtrl.likeOrDislike);


module.exports = router;