import moment from 'moment';
import { Constants } from '../services/Constants';

const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Cumpleaños del jefe',
        start: moment().toDate(),
        end: moment().add( 2, 'hours' ).toDate(),
        bgcolor: '#fafafa',
        notes: 'Comprar el pastel',
        user: {
            id: '1234',
            name: 'Emmanuel'
        }
}],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case Constants.eventAddNew:
            return {
                ...state,
                events: [ 
                    ...state.events,
                    action.payload,
                ]
            }
        
        case Constants.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case Constants.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case Constants.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case Constants.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id )
                ),
                activeEvent: null
            }
    
        default:
            return state;
    }
}