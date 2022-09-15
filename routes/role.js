const { Router } = require('express');
const { getRole, putRole, postRole, deleteRole } = require('../controllers/role')
const { body } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const router = Router();

router.get('/', getRole);
router.put('/', putRole)
router.post('/', [
    body('role').not().isEmpty(),
    validateFields], postRole)
router.delete('/:id', deleteRole)



module.exports = router;