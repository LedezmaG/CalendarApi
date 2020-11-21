const { response } = require('express');
const Event = require('./../models/Event');

const getEvents = async ( req, res = response ) => {

    const response = await Event.find().populate('user', 'name');
    
    res.json({
        status: true,
        response
    })
}

const createEvents = async ( req, res = response ) => {

    const event = new Event( req.body )

    try {
        
        event.user = req.uid;
        const response = await event.save()
        
        res.json({
            status: true,
            response
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'contact with support team',
        })
    }
}

const updateEvents = async ( req, res = response ) => {
    
    const eventID = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventID )

        if ( !event ) {
            return res.status(404).json({
                status: false,
                msg: 'event does not exist',
            })
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                status: false,
                msg: "You don't have access to modificate event",
            })
        }
        
        const newEvent ={
            ...req.body,
            user: uid
        }

        const response = await Event.findByIdAndUpdate( eventID, newEvent, { new: true } )

        res.status(200).json({
            status: true,
            response
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'contact with support team',
        })
    }
}

const deleteEvents = async ( req, res = response ) => {

    const eventID = req.params.id;
    const uid = req.uid;
    
    try {
    
        const event = await Event.findById( eventID )

        console.log( event );

        if ( !event ) {
            return res.status(404).json({
                status: false,
                msg: 'event does not exist',
            })
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                status: false,
                msg: "You don't have access to delete event",
            })
        }

        const response = await Event.findByIdAndRemove( eventID )

        res.status(200).json({
            status: true,
            'response':{
                msg: 'event was deleted',
                id: response.id
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

module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}