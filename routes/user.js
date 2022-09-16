const { Router } = require('express');
const { getUser, putUser, postUser, deleteUser } = require('../controllers/user')
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, isEmailDB, isUserDB } = require('../helpers/db-validators');

const router = Router();
//Definiendo rutas y validaciones antes de acceder al modulo
router.get('/', getUser);
router.put('/:id', [check('id', 'invalid id').isMongoId(), check('id').custom( isUserDB ), check('role').custom(isValidRole), validateFields
], putUser)
router.post('/', [
    check('password').isLength({ min: 6 }),
    check('name').not().isEmpty(),
    check('email').isEmail().not().isEmpty().custom(isEmailDB),
    /* body('role', 'Role not found').isIn(['USER_ROLE', 'ADMIN_ROLE']), */
    check('role').custom(isValidRole),
    validateFields], postUser)
router.delete('/:id', [check('id', 'invalid id').isMongoId(), check('id').custom(isUserDB), validateFields], deleteUser)



module.exports = router;