const express =require('express') ;
const userController =require('../controllers/user_controller.js') ;
const auth = require('../controllers/auth_controller');

const router = express.Router();

router.post('/create_user',userController.createUser)


module.exports = router;
