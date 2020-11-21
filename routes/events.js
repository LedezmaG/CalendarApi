/*
    Routers for Events
    host /api/events
*/
const { Router } = require('express')
const router = Router();

const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/ValidateJWT');
const { isDate } = require('../helpers/isDate');
const { fileValidator } = require('../middlewares/fileValidator');
const { getEvents, createEvents, updateEvents, deleteEvents  } = require('../controllers/events');

// Aplicar Middelware a todas las rutas
router.use( validateJWT )

// get event list
router.get( '/', getEvents  )

// get event list
router.post( 
    '/', 
    [
        check( 'title', 'title is required' ).not().isEmpty(),
        check( 'start', 'start date is required' ).custom( isDate ),
        check( 'end', 'end date is required' ).custom( isDate ),
        fileValidator
    ],
    createEvents 
    )
    
    // get event list
    router.put( 
    '/:id', 
    [
        check( 'title', 'title is required' ).not().isEmpty(),
        check( 'start', 'start date is required' ).custom( isDate ),
        check( 'end', 'end date is required' ).custom( isDate ),
        fileValidator
    ],
    updateEvents 
)

// get event list
router.delete( '/:id', deleteEvents  )

module.exports = router


