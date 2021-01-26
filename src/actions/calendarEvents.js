import Swal from 'sweetalert2';
import { changeEvents } from '../helpers/changeDateToDate';
import { fetchWithToken } from '../helpers/fetch';
import { Constants } from '../services/Constants';

const eventAddNew = ( event ) => ({
    
    type: Constants.eventAddNew,
    payload: event
});

export const eventStartAddNew = ( event ) => {

    return async ( dispatch, getState ) => {

        try {
            
            const { uid, name } = getState().auth;

            const resp = await fetchWithToken( 'events', event, 'POST' );
            const body = await resp.json();

            if ( body.ok ) {
                
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                };

                dispatch( eventAddNew( event ) );
            }

        } catch (error) {
            
            console.log(error);

        }
    }
}

export const eventSetActive = ( event ) => ({
    
    type: Constants.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    
    type: Constants.eventClearActiveEvent
});

export const eventStartUpdate = ( event ) => {

    return async ( dispatch ) => {

        try {

            const resp = await fetchWithToken( `events/${ event.id }`, event, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {

                dispatch( eventUpdated( event ) );

            } else {

                Swal.fire( 'Error', body.msg, 'error' );
            }
            
        } catch (error) {
            
            console.log(error);
        }
    }
}

const eventUpdated = ( event ) => ({
    
    type: Constants.eventUpdated,
    payload: event
});

export const startEventDelete = ( event ) => {

    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;

        try {

            const resp = await fetchWithToken( `events/${ id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {

                dispatch( eventDeleted() );

            } else {

                Swal.fire( 'Error', body.msg, 'error' );
            }
            
        } catch (error) {
            
            console.log(error);
        }
    }
}

const eventDeleted = () => ({
    
    type: Constants.eventDeleted
});

export const startLoadingEvents = () => {

    return async ( dispatch ) => {

        try {

            const resp = await fetchWithToken( 'events' );
            const body = await resp.json();
            const events = changeEvents( body.events );

            dispatch( loadedEvents( events ) );
            
        } catch (error) {
            
            console.log(error);
        }
    }
}

const loadedEvents = ( events ) => ({
    type: Constants.eventLoaded,
    payload: events
})

export const eventsCleaned = () => {
    return {
        type: Constants.eventCleaned 
    }
}