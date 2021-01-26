import './calendarModal.css';

import React, { useEffect } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/calendarEvents';

const customStyles = {
    content : {
        top:            '50%',
        left:           '50%',
        right:          'auto',
        bottom:         'auto',
        marginRight:    '-50%',
        transform:      'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

const now = moment().minutes( 0 ).seconds( 0 ).add( 1, 'hours' );
const nowPlus1 = now.clone().add( 1, 'hours' );

let initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = ( action ) => {

    const [ startDate, setStartDate ] = useState( now.toDate() );
    const [ endDate, setEndDate ] = useState( nowPlus1.toDate() );
    const [ titleValid, setTitleValid ] = useState( true );

    const { modalOpen } = useSelector( state => state.UI );
    const { activeEvent } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const [ formValues, setFormValues ] = useState( initEvent )

    const { title, notes, start, end } = formValues;

    useEffect(() => {

        setTitleValid( true );
        
        if ( activeEvent ) {

            setStartDate( activeEvent.start );
            setEndDate( activeEvent.end );
            setFormValues( activeEvent );

            
        } else {

            setStartDate( initEvent.start );
            setEndDate( initEvent.end );
            setFormValues( initEvent );

        }

    }, [ activeEvent, setFormValues ])

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    const closeModal = () => {

        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setFormValues( initEvent );
    };

    const handleSubmitForm = ( e ) => {
        e.preventDefault();

        const startMoment = moment( start );
        const endMoment = moment( end );

        if ( startMoment.isSameOrAfter( endMoment ) ) {
            Swal.fire( 'Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error' );
            return;
        }

        if ( title.trim().length < 2 ) {

            return setTitleValid( false );
        }

        if ( activeEvent ) {

            if ( action.action === 'select' ) {

                dispatch( eventStartAddNew( formValues ));
            } else {

                
                dispatch( eventStartUpdate( formValues ) );
            }


        } else {

            dispatch( eventStartAddNew( formValues ));
        }

        setTitleValid( true );
        closeModal();
    };

    const handleStartDateChange = ( e ) => {

        setStartDate( e );
        setFormValues({
            ...formValues,
            start: e
        });
    };

    const handleEndDateChange = ( e ) => {

        setEndDate( e );
        setFormValues({
            ...formValues,
            end: e
        });
    }

    return (
        <Modal isOpen={ modalOpen } 
            onRequestClose={ closeModal } 
            style={ customStyles } 
            className="modal" 
            overlayClassName="modal-fondo" 
            closeTimeoutMS={ 200 }>

            <h1>{ ( activeEvent ) ? 'Editar Evento' : 'Nuevo Evento' }</h1>
            <hr />
            <form className="container"
                onSubmit={ handleSubmitForm } >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ startDate }
                        className="form-control"
                        format="dd-MM-y h:mm a"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ endDate }
                        minDate={ startDate }
                        className="form-control"
                        format="dd-MM-y h:mm a"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input type="text" 
                        className={ `form-control ${ !titleValid && 'is-invalid' }` }
                        placeholder="Título del evento" 
                        name="title" 
                        autoComplete="off" 
                        value={ title } 
                        onChange={ handleInputChange } />

                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea type="text" 
                        className="form-control" 
                        placeholder="Notas" 
                        rows="5" 
                        name="notes" 
                        value={ notes } 
                        onChange={ handleInputChange } >
                        
                    </textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button type="submit" 
                    className="btn btn-outline-primary btn-block">

                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
