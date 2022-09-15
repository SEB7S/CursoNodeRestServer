const { Router } = require('express');
const { getUser, putUser, postUser, deleteUser } = require('../controllers/user')
const { body } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const {isValidRole, isEmailDB} = require('../helpers/db-validators');

const router = Router();

router.get('/', getUser);
router.put('/', putUser)
router.post('/', [
    body('password').isLength({ min: 6 }),
    body('name').not().isEmpty(),
    body('email').isEmail().not().isEmpty().custom(isEmailDB),
    /* body('role', 'Role not found').isIn(['USER_ROLE', 'ADMIN_ROLE']), */
    body('role').custom(isValidRole),
    validateFields], postUser)
router.delete('/:id', deleteUser)



module.exports = router;