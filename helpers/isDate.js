const moment = require('moment')

const isDate = ( value ) => {

    const date = moment( value )

    if ( !value ) {
        return false
    }
    
    if ( date.isValid() ) {
        return true
    }
    else{
        return false
    }

}


module.exports = {
    isDate
}