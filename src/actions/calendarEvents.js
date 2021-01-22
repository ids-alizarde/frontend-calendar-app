import { Constants } from '../services/Constants';

export const eventAddNew = ( event ) => ({
    
    type: Constants.eventAddNew,
    payload: event
});

export const eventSetActive = ( event ) => ({
    
    type: Constants.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    
    type: Constants.eventClearActiveEvent
});

export const eventUpdated = ( event ) => ({
    
    type: Constants.eventUpdated,
    payload: event
});

export const eventDeleted = () => ({
    
    type: Constants.eventDeleted
});