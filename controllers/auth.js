const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')
const User = require('../models/User');


const loginforUser = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email })
        if ( !user ) {
            return res.status(400).json({
                status: false,
                msg: 'User is incorret',
            })
        }

        // confirmar password 
        const ValidPassword = bcryptjs.compareSync( password, user.password )

        if ( !ValidPassword ) {
            return res.status(400).json({
                status: false,
                msg: 'Password is incorret',
            })
        }

        // Generar token
        const token = await generateJWT( user.id, user.name );

        res.status(201).json({
            status: true,
            response:{
                token,
                uid: user.id,
                name: user.name,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'contact with support team',
        })
    }


}

const createUser = async ( req, res = response ) => {
    
    const { email, password } = req.body;
    
    try {

        // Valida si el email se encuentra en la BD
        let user = await User.findOne({ email })
        if ( user ) {
            return res.status(400).json({
                status: false,
                msg: 'Email is already register',
            })
        }
        
        // Se crea instancia del usuario y se guarda 
        user = new User( req.body )
        // encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
        // 
        await user.save()
        // Generar token
        const token = await generateJWT( user.id, user.name );
    
        res.status(201).json({
            status: true,
            response:{
                token,
                uid: user.id,
                name: user.name,
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'contact with support team',
        })
    }


}

const validateToken = async ( req, res = response ) => {

    const { uid, name } = req 

    const token = await generateJWT( uid, name );

    res.json({
        status: true,
        msg: 'token alive',
        token
    })
}


module.exports = {
    createUser,
    loginforUser,
    validateToken
}