/*
    Routers for Auth
    host /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

const { fileValidator } = require('../middlewares/fileValidator');
const { createUser, loginforUser, validateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/ValidateJWT');

router.post(
    '/login', 
    // middelware
    [
        check( 'email', 'email is required' ).isEmail(),
        check( 'password', 'password have to be min length 6 characters' ).isLength({ min: 6 }),
        fileValidator
    ], 
    loginforUser 
)

router.post(
    '/create', 
    // middelware
    [
        check( 'name', "'name' is required" ).not().isEmpty(),
        check( 'email', 'email is required' ).isEmail(),
        check( 'password', 'password have to be min length 6 characters ' ).isLength({ min: 6 }),
        fileValidator
    ], 
    createUser 
)

router.get( '/renew', validateJWT, validateToken )

module.exports = router