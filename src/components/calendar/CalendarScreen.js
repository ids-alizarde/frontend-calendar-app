import 'moment/locale/es-mx';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendarMessagesEs';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, startLoadingEvents } from '../../actions/calendarEvents';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


const localizer = momentLocalizer(moment); // or globalizeLocalizer
moment.locale( 'es-mx' );

let initEvent = {}
let action;

export const CalendarScreen = () => {

    const [ lastView, setLastView ] = useState( localStorage.getItem( 'lastView' ) || 'month' );

    const { uid, name } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const { events: myEventsList, activeEvent } = useSelector( state => state.calendar );

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660' ,
            borderRadius: '0px',
            opacity: 0.7,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    };

    useEffect(() => {
        
        dispatch( startLoadingEvents() );

    }, [ dispatch ])

    const onDoubleClick = ( e ) => {
    
        dispatch( uiOpenModal() );
    };

    const onSelectEvent = ( e ) => {

        dispatch( eventSetActive( e ) );
    };

     const onViewChange = ( e ) => {
         
        setLastView( e );
        localStorage.setItem( 'lastView', e );
    };

    const onSelectSlot = ( e ) => {

        action = e.action;

        if ( action === 'select' ) {

            initEvent = {
                title: '',
                notes: '',
                start: e.start,
                end: e.end,
                user: {
                    id: uid,
                    name: name
                }
            }

            dispatch( uiOpenModal() );
            dispatch( eventSetActive ( initEvent) );

        } else {

            dispatch( eventClearActiveEvent() );
            initEvent = null
        }

    }

    return (
        <div className="calendar-screen">
            <NavBar></NavBar>

            <BigCalendar localizer={ localizer }
                events={ myEventsList }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                onView={ onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }} />
            
            <AddNewFab />
            {
                activeEvent && <DeleteEventFab />
            }

            <CalendarModal action={ action } />
        </div>
    )
}
